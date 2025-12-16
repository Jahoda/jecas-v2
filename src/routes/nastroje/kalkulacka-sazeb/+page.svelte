<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import Box from '$lib/box/Box.svelte';
	import MainPost from '$lib/mainPost/MainPost.svelte';

	const title = 'Kalkulačka hodinové / denní / měsíční / roční sazby';
	const description =
		'Přepočítej mezi hodinovou, denní, měsíční a roční sazbou. Zohledni státní svátky, dovolenou a další volné dny.';

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

	// Finalizace při opuštění pole (přepíše input na výsledek)
	function finalizeInput(inputType: 'hourly' | 'daily' | 'monthly' | 'yearly' | 'vacation' | 'hoursPerDay') {
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
