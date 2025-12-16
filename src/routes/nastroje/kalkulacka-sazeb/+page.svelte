<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import Box from '$lib/box/Box.svelte';
	import MainPost from '$lib/mainPost/MainPost.svelte';

	const title = 'Kalkulačka hodinové / denní / měsíční / roční sazby';
	const description =
		'Přepočítej mezi hodinovou, denní, měsíční a roční sazbou. Zohledni státní svátky, dovolenou a další volné dny.';

	// Typ pro scénář
	interface Scenario {
		id: number;
		name: string;
		hourlyRate: number;
		dailyRate: number;
		monthlyRate: number;
		yearlyRate: number;
		hoursPerDay: number;
		vacationDays: number;
		billableHolidays: boolean;
		billableVacation: boolean;
		billableDays: number;
	}

	// State
	let year = $state(new Date().getFullYear());
	let hoursPerDay = $state(8);
	let hourlyRate = $state(625);
	let dailyRate = $state(5000);
	let monthlyRate = $state(0);
	let yearlyRate = $state(0);
	let vacationDays = $state(25);
	let billableHolidays = $state(false);
	let billableVacation = $state(false);
	let lastEdited = $state<'hourly' | 'daily' | 'monthly' | 'yearly'>('daily');
	let initialized = $state(false);

	// Scénáře pro porovnání
	let scenarios = $state<Scenario[]>([]);
	let nextScenarioId = $state(1);

	// OSVČ nastavení
	let expenseType = $state<'flat60' | 'flat40' | 'flat80' | 'actual'>('flat60');
	let actualExpenses = $state(0);
	let actualExpensesInput = $state('0');

	// Textové hodnoty pro inputy (umožňují psát výrazy)
	let hourlyRateInput = $state('625');
	let dailyRateInput = $state('5000');
	let monthlyRateInput = $state('0');
	let yearlyRateInput = $state('0');
	let vacationDaysInput = $state('25');
	let hoursPerDayInput = $state('8');

	// Bezpečné vyhodnocení matematického výrazu
	function evaluateExpression(expr: string): number | null {
		// Povol pouze čísla, operátory a závorky
		const sanitized = expr.replace(/\s/g, '').replace(/,/g, '.');
		if (!/^[\d+\-*/().]+$/.test(sanitized)) {
			return null;
		}
		try {
			// Použij Function místo eval pro lepší izolaci
			const result = new Function(`return (${sanitized})`)();
			if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
				return Math.round(result);
			}
			return null;
		} catch {
			return null;
		}
	}

	// Synchronizace textových inputů s číselnými hodnotami
	function syncInputs() {
		hourlyRateInput = hourlyRate.toString();
		dailyRateInput = dailyRate.toString();
		monthlyRateInput = monthlyRate.toString();
		yearlyRateInput = yearlyRate.toString();
	}

	// Výpočet Velikonoční neděle (Computus algorithm)
	function getEasterSunday(year: number): Date {
		const a = year % 19;
		const b = Math.floor(year / 100);
		const c = year % 100;
		const d = Math.floor(b / 4);
		const e = b % 4;
		const f = Math.floor((b + 8) / 25);
		const g = Math.floor((b - f + 1) / 3);
		const h = (19 * a + b - d - g + 15) % 30;
		const i = Math.floor(c / 4);
		const k = c % 4;
		const l = (32 + 2 * e + 2 * i - h - k) % 7;
		const m = Math.floor((a + 11 * h + 22 * l) / 451);
		const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
		const day = ((h + l - 7 * m + 114) % 31) + 1;
		return new Date(year, month, day);
	}

	// České státní svátky pro daný rok
	function getCzechHolidays(year: number): Date[] {
		const easter = getEasterSunday(year);
		const goodFriday = new Date(easter);
		goodFriday.setDate(easter.getDate() - 2);
		const easterMonday = new Date(easter);
		easterMonday.setDate(easter.getDate() + 1);

		return [
			new Date(year, 0, 1), // 1. leden - Nový rok
			goodFriday, // Velký pátek
			easterMonday, // Velikonoční pondělí
			new Date(year, 4, 1), // 1. květen - Svátek práce
			new Date(year, 4, 8), // 8. květen - Den vítězství
			new Date(year, 6, 5), // 5. červenec - Cyril a Metoděj
			new Date(year, 6, 6), // 6. červenec - Jan Hus
			new Date(year, 8, 28), // 28. září - Den české státnosti
			new Date(year, 9, 28), // 28. říjen - Den vzniku Československa
			new Date(year, 10, 17), // 17. listopad - Den boje za svobodu
			new Date(year, 11, 24), // 24. prosinec - Štědrý den
			new Date(year, 11, 25), // 25. prosinec - 1. svátek vánoční
			new Date(year, 11, 26) // 26. prosinec - 2. svátek vánoční
		];
	}

	// Formátování data pro porovnání
	function formatDate(date: Date): string {
		return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
	}

	// Kontrola, zda je den státní svátek
	function isHoliday(date: Date, holidays: Set<string>): boolean {
		return holidays.has(formatDate(date));
	}

	// Kontrola, zda je den víkend
	function isWeekend(date: Date): boolean {
		const day = date.getDay();
		return day === 0 || day === 6;
	}

	// Výpočet pracovních dní v roce
	function calculateWorkingDays(
		year: number,
		includeHolidays: boolean,
		includeVacation: boolean,
		vacationDaysCount: number
	): { totalWorkDays: number; weekdays: number; holidaysOnWeekdays: number } {
		const holidays = new Set(getCzechHolidays(year).map(formatDate));
		let weekdays = 0;
		let holidaysOnWeekdays = 0;

		const startDate = new Date(year, 0, 1);
		const endDate = new Date(year, 11, 31);

		for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
			if (!isWeekend(d)) {
				weekdays++;
				if (isHoliday(d, holidays)) {
					holidaysOnWeekdays++;
				}
			}
		}

		let totalWorkDays = weekdays;

		// Odečti svátky, pokud se nefakturují
		if (!includeHolidays) {
			totalWorkDays -= holidaysOnWeekdays;
		}

		// Odečti dovolenou, pokud se nefakturuje
		if (!includeVacation) {
			totalWorkDays -= vacationDaysCount;
		}

		return { totalWorkDays, weekdays, holidaysOnWeekdays };
	}

	// Derived values
	let workingDaysInfo = $derived(
		calculateWorkingDays(year, billableHolidays, billableVacation, vacationDays)
	);
	let billableDays = $derived(workingDaysInfo.totalWorkDays);

	// Porovnání - dny při různých nastaveních
	let daysWithAll = $derived(
		calculateWorkingDays(year, true, true, vacationDays).totalWorkDays
	);
	let daysWithoutAll = $derived(
		calculateWorkingDays(year, false, false, vacationDays).totalWorkDays
	);

	// Ekvivalentní sazby pro porovnání
	let equivalentDailyWithAll = $derived(
		daysWithAll > 0 ? Math.round(yearlyRate / daysWithAll) : 0
	);
	let equivalentDailyWithoutAll = $derived(
		daysWithoutAll > 0 ? Math.round(yearlyRate / daysWithoutAll) : 0
	);

	// === OSVČ VÝPOČTY ===
	// Konstanty pro rok 2024/2025
	const TAX_RATE_LOW = 0.15; // 15% daň
	const TAX_RATE_HIGH = 0.23; // 23% daň pro vysoké příjmy
	const TAX_THRESHOLD = 1935552; // Hranice pro 23% daň (48x průměrná mzda)
	const TAX_CREDIT = 30840; // Sleva na poplatníka
	const HEALTH_RATE = 0.135; // 13.5% zdravotní pojištění
	const SOCIAL_RATE = 0.292; // 29.2% sociální pojištění
	const ASSESSMENT_BASE = 0.5; // Vyměřovací základ = 50% zisku
	const MIN_HEALTH_BASE_MONTHLY = 21983; // Minimální vyměřovací základ ZP 2024
	const MIN_SOCIAL_BASE_MONTHLY = 11411; // Minimální vyměřovací základ SP 2024

	// Paušální výdaje - limity
	const FLAT_LIMITS: Record<string, { rate: number; maxExpenses: number }> = {
		flat80: { rate: 0.8, maxExpenses: 1600000 }, // Řemeslné živnosti
		flat60: { rate: 0.6, maxExpenses: 1200000 }, // Ostatní živnosti
		flat40: { rate: 0.4, maxExpenses: 800000 } // Jiná činnost (autorské honoráře apod.)
	};

	// Výpočet výdajů podle typu
	let expenses = $derived(() => {
		if (expenseType === 'actual') {
			return actualExpenses;
		}
		const limit = FLAT_LIMITS[expenseType];
		const calculated = yearlyRate * limit.rate;
		return Math.min(calculated, limit.maxExpenses);
	});

	// Základ daně (příjmy - výdaje)
	let taxBase = $derived(Math.max(0, yearlyRate - expenses()));

	// Vyměřovací základ pro pojištění (50% ze základu daně)
	let assessmentBase = $derived(taxBase * ASSESSMENT_BASE);

	// Zdravotní pojištění OSVČ
	let osvcHealthInsurance = $derived(() => {
		const minYearlyBase = MIN_HEALTH_BASE_MONTHLY * 12;
		const base = Math.max(assessmentBase, minYearlyBase);
		return Math.round(base * HEALTH_RATE);
	});

	// Sociální pojištění OSVČ
	let osvcSocialInsurance = $derived(() => {
		const minYearlyBase = MIN_SOCIAL_BASE_MONTHLY * 12;
		const base = Math.max(assessmentBase, minYearlyBase);
		return Math.round(base * SOCIAL_RATE);
	});

	// Daň z příjmu OSVČ (progresivní)
	let osvcIncomeTax = $derived(() => {
		if (taxBase <= 0) return 0;
		let tax: number;
		if (taxBase <= TAX_THRESHOLD) {
			tax = taxBase * TAX_RATE_LOW;
		} else {
			tax = TAX_THRESHOLD * TAX_RATE_LOW + (taxBase - TAX_THRESHOLD) * TAX_RATE_HIGH;
		}
		// Uplatníme slevu na poplatníka
		return Math.max(0, Math.round(tax - TAX_CREDIT));
	});

	// Celkové odvody OSVČ
	let osvcTotalDeductions = $derived(osvcHealthInsurance() + osvcSocialInsurance() + osvcIncomeTax());

	// Čistý příjem OSVČ
	let osvcNetIncome = $derived(yearlyRate - osvcTotalDeductions);

	// Efektivní daňová zátěž OSVČ (%)
	let osvcEffectiveTaxRate = $derived(
		yearlyRate > 0 ? Math.round((osvcTotalDeductions / yearlyRate) * 1000) / 10 : 0
	);

	// === HPP VÝPOČTY (pro porovnání) ===
	// Konstanty pro zaměstnance
	const EMPLOYEE_HEALTH_RATE = 0.045; // 4.5% ZP zaměstnanec
	const EMPLOYEE_SOCIAL_RATE = 0.065; // 6.5% SP zaměstnanec
	const EMPLOYER_HEALTH_RATE = 0.09; // 9% ZP zaměstnavatel
	const EMPLOYER_SOCIAL_RATE = 0.248; // 24.8% SP zaměstnavatel

	// Výpočet čistého příjmu zaměstnance z hrubé mzdy
	function calculateEmployeeNetFromGross(yearlyGross: number): number {
		// Pojištění placené zaměstnancem
		const employeeHealth = Math.round(yearlyGross * EMPLOYEE_HEALTH_RATE);
		const employeeSocial = Math.round(yearlyGross * EMPLOYEE_SOCIAL_RATE);

		// Základ daně = hrubá mzda (od 2021 zrušena superhrubá mzda)
		const taxBase = yearlyGross;

		// Daň z příjmu (progresivní)
		let tax: number;
		if (taxBase <= TAX_THRESHOLD) {
			tax = taxBase * TAX_RATE_LOW;
		} else {
			tax = TAX_THRESHOLD * TAX_RATE_LOW + (taxBase - TAX_THRESHOLD) * TAX_RATE_HIGH;
		}
		tax = Math.max(0, Math.round(tax - TAX_CREDIT));

		return yearlyGross - employeeHealth - employeeSocial - tax;
	}

	// Výpočet hrubé mzdy zaměstnance pro daný čistý příjem (iterativní)
	function calculateGrossFromNet(targetNet: number): number {
		// Binární hledání hrubé mzdy
		let low = targetNet;
		let high = targetNet * 2;

		for (let i = 0; i < 50; i++) {
			const mid = (low + high) / 2;
			const net = calculateEmployeeNetFromGross(mid);

			if (Math.abs(net - targetNet) < 10) {
				return Math.round(mid);
			}

			if (net < targetNet) {
				low = mid;
			} else {
				high = mid;
			}
		}

		return Math.round((low + high) / 2);
	}

	// Ekvivalentní hrubá mzda zaměstnance pro stejný čistý příjem
	let equivalentGrossSalary = $derived(calculateGrossFromNet(osvcNetIncome));

	// Celkové náklady zaměstnavatele (superhrubá mzda)
	let employerTotalCost = $derived(
		Math.round(equivalentGrossSalary * (1 + EMPLOYER_HEALTH_RATE + EMPLOYER_SOCIAL_RATE))
	);

	// Měsíční hodnoty pro zobrazení
	let equivalentGrossMonthly = $derived(Math.round(equivalentGrossSalary / 12));
	let employerTotalCostMonthly = $derived(Math.round(employerTotalCost / 12));
	let osvcNetMonthly = $derived(Math.round(osvcNetIncome / 12));

	// Přepočet sazeb (bez sync - pro živé vyhodnocování)
	function recalculateFromHourly(hourly: number, sync = true) {
		hourlyRate = hourly;
		dailyRate = Math.round(hourly * hoursPerDay);
		monthlyRate = Math.round((dailyRate * billableDays) / 12);
		yearlyRate = Math.round(dailyRate * billableDays);
		if (sync) syncInputs();
	}

	function recalculateFromDaily(daily: number, sync = true) {
		dailyRate = daily;
		hourlyRate = Math.round(daily / hoursPerDay);
		monthlyRate = Math.round((daily * billableDays) / 12);
		yearlyRate = Math.round(daily * billableDays);
		if (sync) syncInputs();
	}

	function recalculateFromMonthly(monthly: number, sync = true) {
		monthlyRate = monthly;
		dailyRate = Math.round((monthly * 12) / billableDays);
		hourlyRate = Math.round(dailyRate / hoursPerDay);
		yearlyRate = monthly * 12;
		if (sync) syncInputs();
	}

	function recalculateFromYearly(yearly: number, sync = true) {
		yearlyRate = yearly;
		dailyRate = Math.round(yearly / billableDays);
		hourlyRate = Math.round(dailyRate / hoursPerDay);
		monthlyRate = Math.round(yearly / 12);
		if (sync) syncInputs();
	}

	// Živé vyhodnocování při psaní (nepřepisuje aktivní input)
	function onHourlyInput() {
		if (!initialized) return;
		const result = evaluateExpression(hourlyRateInput);
		if (result !== null && result >= 0) {
			lastEdited = 'hourly';
			hourlyRate = result;
			dailyRate = Math.round(result * hoursPerDay);
			monthlyRate = Math.round((dailyRate * billableDays) / 12);
			yearlyRate = Math.round(dailyRate * billableDays);
			// Sync jen ostatní inputy
			dailyRateInput = dailyRate.toString();
			monthlyRateInput = monthlyRate.toString();
			yearlyRateInput = yearlyRate.toString();
			updateUrl();
		}
	}

	function onDailyInput() {
		if (!initialized) return;
		const result = evaluateExpression(dailyRateInput);
		if (result !== null && result >= 0) {
			lastEdited = 'daily';
			dailyRate = result;
			hourlyRate = Math.round(result / hoursPerDay);
			monthlyRate = Math.round((result * billableDays) / 12);
			yearlyRate = Math.round(result * billableDays);
			// Sync jen ostatní inputy, ne aktivní
			hourlyRateInput = hourlyRate.toString();
			monthlyRateInput = monthlyRate.toString();
			yearlyRateInput = yearlyRate.toString();
			updateUrl();
		}
	}

	function onMonthlyInput() {
		if (!initialized) return;
		const result = evaluateExpression(monthlyRateInput);
		if (result !== null && result >= 0) {
			lastEdited = 'monthly';
			monthlyRate = result;
			dailyRate = Math.round((result * 12) / billableDays);
			hourlyRate = Math.round(dailyRate / hoursPerDay);
			yearlyRate = result * 12;
			// Sync jen ostatní inputy
			hourlyRateInput = hourlyRate.toString();
			dailyRateInput = dailyRate.toString();
			yearlyRateInput = yearlyRate.toString();
			updateUrl();
		}
	}

	function onYearlyInput() {
		if (!initialized) return;
		const result = evaluateExpression(yearlyRateInput);
		if (result !== null && result >= 0) {
			lastEdited = 'yearly';
			yearlyRate = result;
			dailyRate = Math.round(result / billableDays);
			hourlyRate = Math.round(dailyRate / hoursPerDay);
			monthlyRate = Math.round(result / 12);
			// Sync jen ostatní inputy
			hourlyRateInput = hourlyRate.toString();
			dailyRateInput = dailyRate.toString();
			monthlyRateInput = monthlyRate.toString();
			updateUrl();
		}
	}

	function onVacationInput() {
		if (!initialized) return;
		const result = evaluateExpression(vacationDaysInput);
		if (result !== null && result >= 0 && result <= 365) {
			vacationDays = result;
			handleSettingsChange();
		}
	}

	function onHoursPerDayInput() {
		if (!initialized) return;
		const result = evaluateExpression(hoursPerDayInput);
		if (result !== null && result > 0 && result <= 24) {
			hoursPerDay = result;
			handleSettingsChange();
		}
	}

	function onActualExpensesInput() {
		if (!initialized) return;
		const result = evaluateExpression(actualExpensesInput);
		if (result !== null && result >= 0) {
			actualExpenses = result;
		}
	}

	// Finalizace při opuštění pole (přepíše input na výsledek)
	function finalizeInput(inputType: 'hourly' | 'daily' | 'monthly' | 'yearly' | 'vacation' | 'hoursPerDay' | 'actualExpenses') {
		if (inputType === 'hourly') {
			hourlyRateInput = hourlyRate.toString();
		} else if (inputType === 'daily') {
			dailyRateInput = dailyRate.toString();
		} else if (inputType === 'monthly') {
			monthlyRateInput = monthlyRate.toString();
		} else if (inputType === 'yearly') {
			yearlyRateInput = yearlyRate.toString();
		} else if (inputType === 'vacation') {
			vacationDaysInput = vacationDays.toString();
		} else if (inputType === 'hoursPerDay') {
			hoursPerDayInput = hoursPerDay.toString();
		} else if (inputType === 'actualExpenses') {
			actualExpensesInput = actualExpenses.toString();
		}
	}

	function handleSettingsChange() {
		if (!initialized) return;
		// Přepočítej podle posledně editované hodnoty
		if (lastEdited === 'hourly') {
			recalculateFromHourly(hourlyRate);
		} else if (lastEdited === 'daily') {
			recalculateFromDaily(dailyRate);
		} else if (lastEdited === 'monthly') {
			recalculateFromMonthly(monthlyRate);
		} else {
			recalculateFromYearly(yearlyRate);
		}
		updateUrl();
	}

	// URL management
	function updateUrl() {
		if (!browser) return;

		const params = new URLSearchParams();
		params.set('rok', year.toString());
		params.set('hodiny', hoursPerDay.toString());
		params.set('denni', dailyRate.toString());
		params.set('dovolena', vacationDays.toString());
		params.set('fakturovat_svatky', billableHolidays ? '1' : '0');
		params.set('fakturovat_dovolenou', billableVacation ? '1' : '0');

		goto(`?${params.toString()}`, { replaceState: true, keepFocus: true, noScroll: true });
	}

	// Inicializace z URL parametrů - jen jednou při načtení
	onMount(() => {
		const params = new URLSearchParams(window.location.search);

		const urlYear = params.get('rok');
		const urlHours = params.get('hodiny');
		const urlDaily = params.get('denni');
		const urlVacation = params.get('dovolena');
		const urlBillableHolidays = params.get('fakturovat_svatky');
		const urlBillableVacation = params.get('fakturovat_dovolenou');

		if (urlYear) year = parseInt(urlYear);
		if (urlHours) {
			hoursPerDay = parseInt(urlHours);
			hoursPerDayInput = urlHours;
		}
		if (urlVacation) {
			vacationDays = parseInt(urlVacation);
			vacationDaysInput = urlVacation;
		}
		if (urlBillableHolidays) billableHolidays = urlBillableHolidays === '1';
		if (urlBillableVacation) billableVacation = urlBillableVacation === '1';

		if (urlDaily) {
			dailyRate = parseInt(urlDaily);
		}

		// Počkej na další tick, aby se aktualizovaly derived hodnoty
		setTimeout(() => {
			recalculateFromDaily(dailyRate);
			initialized = true;
		}, 0);
	});

	// Formátování čísla s mezerami jako oddělovač tisíců
	function formatNumber(num: number): string {
		return num.toLocaleString('cs-CZ');
	}

	// Kopírování odkazu do schránky
	let copied = $state(false);
	async function copyLink() {
		if (!browser) return;
		await navigator.clipboard.writeText(window.location.href);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	// Správa scénářů
	function addScenario() {
		const scenario: Scenario = {
			id: nextScenarioId++,
			name: `Scénář ${scenarios.length + 1}`,
			hourlyRate,
			dailyRate,
			monthlyRate,
			yearlyRate,
			hoursPerDay,
			vacationDays,
			billableHolidays,
			billableVacation,
			billableDays
		};
		scenarios = [...scenarios, scenario];
	}

	function removeScenario(id: number) {
		scenarios = scenarios.filter((s) => s.id !== id);
	}

	function loadScenario(scenario: Scenario) {
		hoursPerDay = scenario.hoursPerDay;
		hoursPerDayInput = scenario.hoursPerDay.toString();
		vacationDays = scenario.vacationDays;
		vacationDaysInput = scenario.vacationDays.toString();
		billableHolidays = scenario.billableHolidays;
		billableVacation = scenario.billableVacation;
		dailyRate = scenario.dailyRate;
		lastEdited = 'daily';

		// Počkej na přepočet billableDays
		setTimeout(() => {
			recalculateFromDaily(dailyRate);
			updateUrl();
		}, 0);
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<MainPost noImage {title} {description} />

<div class="grid gap-6 md:grid-cols-2">
	<!-- Nastavení -->
	<Box>
		<h2 class="mb-4 text-lg font-semibold">Nastavení</h2>

		<div>
			<label for="year">Rok</label>
			<div class="mt-1"></div>
			<input
				type="number"
				id="year"
				name="year"
				bind:value={year}
				min={2000}
				max={2100}
				oninput={handleSettingsChange}
				class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600"
			/>
		</div>
		<div class="mt-4"></div>

		<div>
			<label for="hoursPerDay">Hodin denně</label>
			<div class="mt-1"></div>
			<input
				type="text"
				inputmode="numeric"
				id="hoursPerDay"
				name="hoursPerDay"
				bind:value={hoursPerDayInput}
				oninput={onHoursPerDayInput}
				onblur={() => finalizeInput('hoursPerDay')}
				class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600"
				placeholder="např. 8"
			/>
		</div>
		<div class="mt-4"></div>

		<div>
			<label for="vacation">Dny dovolené / volna</label>
			<div class="mt-1"></div>
			<input
				type="text"
				inputmode="numeric"
				id="vacation"
				name="vacation"
				bind:value={vacationDaysInput}
				oninput={onVacationInput}
				onblur={() => finalizeInput('vacation')}
				class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600"
				placeholder="např. 20+5"
			/>
		</div>
		<div class="mt-4"></div>

		<div class="space-y-3">
			<label class="flex cursor-pointer items-center gap-3">
				<input
					type="checkbox"
					bind:checked={billableHolidays}
					onchange={handleSettingsChange}
					class="h-5 w-5 rounded border-slate-300 dark:border-slate-600"
				/>
				<span>Fakturovat státní svátky</span>
			</label>

			<label class="flex cursor-pointer items-center gap-3">
				<input
					type="checkbox"
					bind:checked={billableVacation}
					onchange={handleSettingsChange}
					class="h-5 w-5 rounded border-slate-300 dark:border-slate-600"
				/>
				<span>Fakturovat dovolenou / volno</span>
			</label>
		</div>
	</Box>

	<!-- Statistiky -->
	<Box>
		<h2 class="mb-4 text-lg font-semibold">Statistiky pro rok {year}</h2>

		<div class="space-y-2 text-sm">
			<div class="flex justify-between">
				<span class="text-slate-600 dark:text-slate-400">Pracovní dny (Po-Pá):</span>
				<span class="font-medium">{workingDaysInfo.weekdays}</span>
			</div>
			<div class="flex justify-between">
				<span class="text-slate-600 dark:text-slate-400">Státní svátky (v pracovní dny):</span>
				<span class="font-medium">{workingDaysInfo.holidaysOnWeekdays}</span>
			</div>
			<div class="flex justify-between">
				<span class="text-slate-600 dark:text-slate-400">Dny dovolené:</span>
				<span class="font-medium">{vacationDays}</span>
			</div>
			<hr class="my-2 border-slate-200 dark:border-slate-600" />
			<div class="flex justify-between text-base">
				<span class="font-medium">Fakturovatelné dny:</span>
				<span class="font-bold text-green-600 dark:text-green-400">{billableDays}</span>
			</div>
		</div>
	</Box>
</div>

<!-- Sazby -->
<div class="mt-6">
	<Box>
		<h2 class="mb-4 text-lg font-semibold">Sazby</h2>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			<div>
				<label for="hourly">Hodinová sazba (Kč)</label>
				<div class="mt-1"></div>
				<input
					type="text"
					inputmode="numeric"
					id="hourly"
					name="hourly"
					bind:value={hourlyRateInput}
					oninput={onHourlyInput}
					onblur={() => finalizeInput('hourly')}
					class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600"
					placeholder="např. 600+25"
				/>
				<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
					{formatNumber(hourlyRate)} Kč / hod
				</p>
			</div>

			<div>
				<label for="daily">Denní sazba (Kč)</label>
				<div class="mt-1"></div>
				<input
					type="text"
					inputmode="numeric"
					id="daily"
					name="daily"
					bind:value={dailyRateInput}
					oninput={onDailyInput}
					onblur={() => finalizeInput('daily')}
					class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600"
					placeholder="např. 5000+500"
				/>
				<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
					{formatNumber(dailyRate)} Kč / den
				</p>
			</div>

			<div>
				<label for="monthly">Měsíční sazba (Kč)</label>
				<div class="mt-1"></div>
				<input
					type="text"
					inputmode="numeric"
					id="monthly"
					name="monthly"
					bind:value={monthlyRateInput}
					oninput={onMonthlyInput}
					onblur={() => finalizeInput('monthly')}
					class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600"
					placeholder="např. 100000*1.1"
				/>
				<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
					{formatNumber(monthlyRate)} Kč / měsíc
				</p>
			</div>

			<div>
				<label for="yearly">Roční sazba (Kč)</label>
				<div class="mt-1"></div>
				<input
					type="text"
					inputmode="numeric"
					id="yearly"
					name="yearly"
					bind:value={yearlyRateInput}
					oninput={onYearlyInput}
					onblur={() => finalizeInput('yearly')}
					class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600"
					placeholder="např. 1000000+200000"
				/>
				<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
					{formatNumber(yearlyRate)} Kč / rok
				</p>
			</div>
		</div>
	</Box>
</div>

<!-- Porovnání sazeb -->
<div class="mt-6">
	<Box>
		<h2 class="mb-4 text-lg font-semibold">Porovnání denních sazeb</h2>
		<p class="mb-4 text-sm text-slate-600 dark:text-slate-400">
			Ekvivalentní denní sazby pro stejný roční příjem ({formatNumber(yearlyRate)} Kč):
		</p>

		<div class="grid gap-4 md:grid-cols-2">
			<div class="rounded-lg border border-slate-200 p-4 dark:border-slate-600">
				<div class="mb-2 text-sm text-slate-500 dark:text-slate-400">
					S fakturací svátků i dovolené
				</div>
				<div class="text-2xl font-bold text-slate-800 dark:text-slate-200">
					{formatNumber(equivalentDailyWithAll)} Kč/den
				</div>
				<div class="mt-1 text-xs text-slate-400">
					{daysWithAll} fakturovatelných dní
				</div>
			</div>

			<div class="rounded-lg border border-slate-200 p-4 dark:border-slate-600">
				<div class="mb-2 text-sm text-slate-500 dark:text-slate-400">
					Bez fakturace svátků a dovolené
				</div>
				<div class="text-2xl font-bold text-slate-800 dark:text-slate-200">
					{formatNumber(equivalentDailyWithoutAll)} Kč/den
				</div>
				<div class="mt-1 text-xs text-slate-400">
					{daysWithoutAll} fakturovatelných dní
				</div>
			</div>
		</div>

		{#if equivalentDailyWithoutAll > equivalentDailyWithAll}
			<p class="mt-4 text-sm text-slate-600 dark:text-slate-400">
				Rozdíl: <strong class="text-orange-600 dark:text-orange-400">+{formatNumber(equivalentDailyWithoutAll - equivalentDailyWithAll)} Kč/den</strong>
				({Math.round(((equivalentDailyWithoutAll - equivalentDailyWithAll) / equivalentDailyWithAll) * 100)}% více)
				při nefakturování svátků a dovolené.
			</p>
		{/if}
	</Box>
</div>

<!-- Čistý příjem OSVČ -->
<div class="mt-6">
	<Box>
		<h2 class="mb-4 text-lg font-semibold">Čistý příjem OSVČ</h2>

		<div class="mb-6 grid gap-4 md:grid-cols-2">
			<div>
				<label for="expenseType" class="block text-sm font-medium">Typ výdajů</label>
				<div class="mt-1"></div>
				<select
					id="expenseType"
					bind:value={expenseType}
					class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600"
				>
					<option value="flat60">Paušál 60% (ostatní živnosti, max 1,2M)</option>
					<option value="flat80">Paušál 80% (řemeslné živnosti, max 1,6M)</option>
					<option value="flat40">Paušál 40% (jiná činnost, max 800k)</option>
					<option value="actual">Skutečné výdaje</option>
				</select>
			</div>

			{#if expenseType === 'actual'}
				<div>
					<label for="actualExpenses" class="block text-sm font-medium">Skutečné výdaje (Kč/rok)</label>
					<div class="mt-1"></div>
					<input
						type="text"
						inputmode="numeric"
						id="actualExpenses"
						name="actualExpenses"
						bind:value={actualExpensesInput}
						oninput={onActualExpensesInput}
						onblur={() => finalizeInput('actualExpenses')}
						class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600"
						placeholder="např. 200000"
					/>
				</div>
			{:else}
				<div>
					<span class="block text-sm font-medium">Paušální výdaje</span>
					<div class="mt-1"></div>
					<div class="rounded-md border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-600 dark:bg-slate-700">
						{formatNumber(expenses())} Kč
					</div>
				</div>
			{/if}
		</div>

		<div class="mb-4 space-y-2 text-sm">
			<div class="flex justify-between">
				<span class="text-slate-600 dark:text-slate-400">Roční příjmy (fakturace):</span>
				<span class="font-medium">{formatNumber(yearlyRate)} Kč</span>
			</div>
			<div class="flex justify-between">
				<span class="text-slate-600 dark:text-slate-400">Výdaje:</span>
				<span class="font-medium">-{formatNumber(expenses())} Kč</span>
			</div>
			<div class="flex justify-between">
				<span class="text-slate-600 dark:text-slate-400">Základ daně:</span>
				<span class="font-medium">{formatNumber(taxBase)} Kč</span>
			</div>
			<hr class="my-2 border-slate-200 dark:border-slate-600" />
			<div class="flex justify-between">
				<span class="text-slate-600 dark:text-slate-400">Zdravotní pojištění:</span>
				<span class="font-medium text-red-600 dark:text-red-400">-{formatNumber(osvcHealthInsurance())} Kč</span>
			</div>
			<div class="flex justify-between">
				<span class="text-slate-600 dark:text-slate-400">Sociální pojištění:</span>
				<span class="font-medium text-red-600 dark:text-red-400">-{formatNumber(osvcSocialInsurance())} Kč</span>
			</div>
			<div class="flex justify-between">
				<span class="text-slate-600 dark:text-slate-400">Daň z příjmu (po slevě):</span>
				<span class="font-medium text-red-600 dark:text-red-400">-{formatNumber(osvcIncomeTax())} Kč</span>
			</div>
			<hr class="my-2 border-slate-200 dark:border-slate-600" />
			<div class="flex justify-between">
				<span class="text-slate-600 dark:text-slate-400">Celkové odvody:</span>
				<span class="font-medium text-red-600 dark:text-red-400">-{formatNumber(osvcTotalDeductions)} Kč</span>
			</div>
		</div>

		<div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
			<div class="flex items-center justify-between">
				<div>
					<div class="text-sm text-slate-600 dark:text-slate-400">Čistý roční příjem OSVČ</div>
					<div class="text-3xl font-bold text-green-600 dark:text-green-400">
						{formatNumber(osvcNetIncome)} Kč
					</div>
					<div class="mt-1 text-sm text-slate-500">
						{formatNumber(osvcNetMonthly)} Kč měsíčně
					</div>
				</div>
				<div class="text-right">
					<div class="text-sm text-slate-600 dark:text-slate-400">Efektivní daňová zátěž</div>
					<div class="text-2xl font-bold text-slate-700 dark:text-slate-300">
						{osvcEffectiveTaxRate}%
					</div>
				</div>
			</div>
		</div>
	</Box>
</div>

<!-- Porovnání s HPP -->
<div class="mt-6">
	<Box>
		<h2 class="mb-4 text-lg font-semibold">Porovnání s HPP (zaměstnancem)</h2>
		<p class="mb-4 text-sm text-slate-600 dark:text-slate-400">
			Kolik musí brát zaměstnanec hrubého, aby měl stejný čistý příjem jako OSVČ?
		</p>

		<div class="grid gap-4 md:grid-cols-3">
			<div class="rounded-lg border border-slate-200 p-4 dark:border-slate-600">
				<div class="mb-2 text-sm text-slate-500 dark:text-slate-400">
					Čistý příjem (cíl)
				</div>
				<div class="text-2xl font-bold text-green-600 dark:text-green-400">
					{formatNumber(osvcNetIncome)} Kč/rok
				</div>
				<div class="mt-1 text-sm text-slate-400">
					{formatNumber(osvcNetMonthly)} Kč/měsíc
				</div>
			</div>

			<div class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
				<div class="mb-2 text-sm text-slate-500 dark:text-slate-400">
					Potřebná hrubá mzda
				</div>
				<div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
					{formatNumber(equivalentGrossSalary)} Kč/rok
				</div>
				<div class="mt-1 text-sm text-slate-400">
					{formatNumber(equivalentGrossMonthly)} Kč/měsíc
				</div>
			</div>

			<div class="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-900/20">
				<div class="mb-2 text-sm text-slate-500 dark:text-slate-400">
					Náklady zaměstnavatele
				</div>
				<div class="text-2xl font-bold text-orange-600 dark:text-orange-400">
					{formatNumber(employerTotalCost)} Kč/rok
				</div>
				<div class="mt-1 text-sm text-slate-400">
					{formatNumber(employerTotalCostMonthly)} Kč/měsíc
				</div>
			</div>
		</div>

		<div class="mt-4 rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-800">
			<div class="font-medium text-slate-700 dark:text-slate-300">Co to znamená:</div>
			<ul class="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
				<li>
					• Zaměstnanec potřebuje hrubou mzdu <strong>{formatNumber(equivalentGrossMonthly)} Kč/měsíc</strong>, aby měl stejný čistý příjem jako Vy.
				</li>
				<li>
					• Zaměstnavatel by za něj zaplatil celkem <strong>{formatNumber(employerTotalCostMonthly)} Kč/měsíc</strong> (včetně odvodů).
				</li>
				{#if yearlyRate > employerTotalCost}
					<li class="text-green-600 dark:text-green-400">
						• Vaše fakturace ({formatNumber(yearlyRate)} Kč) je <strong>vyšší</strong> než náklady zaměstnavatele - jste pro firmu dražší.
					</li>
				{:else}
					<li class="text-orange-600 dark:text-orange-400">
						• Vaše fakturace ({formatNumber(yearlyRate)} Kč) je <strong>nižší</strong> než náklady zaměstnavatele - jste pro firmu levnější.
					</li>
				{/if}
			</ul>
		</div>
	</Box>
</div>

<!-- Porovnání scénářů -->
<div class="mt-6">
	<Box>
		<div class="mb-4 flex items-center justify-between">
			<h2 class="text-lg font-semibold">Porovnání scénářů</h2>
			<button
				onclick={addScenario}
				class="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-500"
			>
				+ Uložit jako scénář
			</button>
		</div>

		{#if scenarios.length === 0}
			<p class="text-sm text-slate-500 dark:text-slate-400">
				Zatím nemáte žádné uložené scénáře. Nastavte různé parametry a klikněte na "Uložit jako scénář" pro porovnání.
			</p>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-slate-200 dark:border-slate-600">
							<th class="pb-2 text-left font-medium text-slate-600 dark:text-slate-400">Scénář</th>
							<th class="pb-2 text-right font-medium text-slate-600 dark:text-slate-400">Hod.</th>
							<th class="pb-2 text-right font-medium text-slate-600 dark:text-slate-400">Denní</th>
							<th class="pb-2 text-right font-medium text-slate-600 dark:text-slate-400">Měsíční</th>
							<th class="pb-2 text-right font-medium text-slate-600 dark:text-slate-400">Roční</th>
							<th class="pb-2 text-right font-medium text-slate-600 dark:text-slate-400">Dní</th>
							<th class="pb-2 text-right font-medium text-slate-600 dark:text-slate-400">Akce</th>
						</tr>
					</thead>
					<tbody>
						{#each scenarios as scenario (scenario.id)}
							<tr class="border-b border-slate-100 last:border-0 dark:border-slate-700">
								<td class="py-2">
									<div class="font-medium">{scenario.name}</div>
									<div class="text-xs text-slate-400">
										{scenario.hoursPerDay}h/den, {scenario.vacationDays}d dov.
										{#if scenario.billableHolidays}+sv{/if}
										{#if scenario.billableVacation}+dov{/if}
									</div>
								</td>
								<td class="py-2 text-right tabular-nums">{formatNumber(scenario.hourlyRate)}</td>
								<td class="py-2 text-right tabular-nums">{formatNumber(scenario.dailyRate)}</td>
								<td class="py-2 text-right tabular-nums">{formatNumber(scenario.monthlyRate)}</td>
								<td class="py-2 text-right tabular-nums font-medium">{formatNumber(scenario.yearlyRate)}</td>
								<td class="py-2 text-right tabular-nums">{scenario.billableDays}</td>
								<td class="py-2 text-right">
									<button
										onclick={() => loadScenario(scenario)}
										class="mr-1 rounded px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-slate-700"
										title="Načíst tento scénář"
									>
										Načíst
									</button>
									<button
										onclick={() => removeScenario(scenario.id)}
										class="rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-slate-700"
										title="Smazat tento scénář"
									>
										Smazat
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			{#if scenarios.length >= 2}
				<div class="mt-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
					<div class="text-sm font-medium text-slate-600 dark:text-slate-400">Rozdíl mezi scénáři</div>
					<div class="mt-2 grid gap-2 text-sm md:grid-cols-2">
						<div>
							<span class="text-slate-500">Roční příjem:</span>
							<span class="ml-1 font-medium">
								{formatNumber(Math.max(...scenarios.map(s => s.yearlyRate)) - Math.min(...scenarios.map(s => s.yearlyRate)))} Kč
							</span>
						</div>
						<div>
							<span class="text-slate-500">Denní sazba:</span>
							<span class="ml-1 font-medium">
								{formatNumber(Math.max(...scenarios.map(s => s.dailyRate)) - Math.min(...scenarios.map(s => s.dailyRate)))} Kč
							</span>
						</div>
					</div>
				</div>
			{/if}
		{/if}
	</Box>
</div>

<!-- Sdílet odkaz -->
<div class="mt-6">
	<Box>
		<div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h3 class="font-medium">Sdílet výpočet</h3>
				<p class="text-sm text-slate-500 dark:text-slate-400">
					Zkopíruj odkaz pro sdílení aktuálního nastavení
				</p>
			</div>
			<button
				onclick={copyLink}
				class="rounded-lg bg-slate-800 px-4 py-2 text-white transition-colors hover:bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500"
			>
				{copied ? 'Zkopírováno!' : 'Kopírovat odkaz'}
			</button>
		</div>
	</Box>
</div>

<!-- Info o výpočtu -->
<div class="mt-6">
	<Box>
		<h2 class="mb-4 text-lg font-semibold">Jak funguje výpočet</h2>

		<div class="space-y-3 text-sm text-slate-600 dark:text-slate-400">
			<p>
				<strong>Fakturovatelné dny</strong> = Pracovní dny v roce (Po-Pá) minus státní svátky (pokud
				nejsou fakturovány) minus dovolená (pokud není fakturována).
			</p>
			<p>
				<strong>Měsíční sazba</strong> = (Denní sazba × Fakturovatelné dny) ÷ 12 měsíců
			</p>
			<p>
				<strong>Roční sazba</strong> = Denní sazba × Fakturovatelné dny
			</p>
			<p class="mt-4">
				<strong>České státní svátky ({year}):</strong> Nový rok, Velký pátek, Velikonoční pondělí, 1.
				května, 8. května, 5. července, 6. července, 28. září, 28. října, 17. listopadu, 24.-26.
				prosince.
			</p>
		</div>
	</Box>
</div>
