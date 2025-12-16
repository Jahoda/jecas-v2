<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import Box from '$lib/box/Box.svelte';
	import MainPost from '$lib/mainPost/MainPost.svelte';

	const title = 'Kalkulačka denní / měsíční / roční sazby';
	const description =
		'Přepočítej mezi denní, měsíční a roční sazbou. Zohledni státní svátky, dovolenou a další volné dny.';

	// State
	let year = $state(new Date().getFullYear());
	let dailyRate = $state(5000);
	let monthlyRate = $state(0);
	let yearlyRate = $state(0);
	let vacationDays = $state(25);
	let billableHolidays = $state(false);
	let billableVacation = $state(false);
	let lastEdited = $state<'daily' | 'monthly' | 'yearly'>('daily');

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

	// Přepočet sazeb
	function recalculateFromDaily(daily: number) {
		monthlyRate = Math.round((daily * billableDays) / 12);
		yearlyRate = Math.round(daily * billableDays);
	}

	function recalculateFromMonthly(monthly: number) {
		dailyRate = Math.round((monthly * 12) / billableDays);
		yearlyRate = monthly * 12;
	}

	function recalculateFromYearly(yearly: number) {
		dailyRate = Math.round(yearly / billableDays);
		monthlyRate = Math.round(yearly / 12);
	}

	// Efekt pro přepočet při změně parametrů
	$effect(() => {
		// Sleduj změny v billableDays
		const days = billableDays;
		if (days > 0) {
			if (lastEdited === 'daily') {
				recalculateFromDaily(dailyRate);
			} else if (lastEdited === 'monthly') {
				recalculateFromMonthly(monthlyRate);
			} else {
				recalculateFromYearly(yearlyRate);
			}
		}
	});

	// Handlery pro změnu hodnot
	function handleDailyChange(value: number) {
		dailyRate = value;
		lastEdited = 'daily';
		recalculateFromDaily(value);
		updateUrl();
	}

	function handleMonthlyChange(value: number) {
		monthlyRate = value;
		lastEdited = 'monthly';
		recalculateFromMonthly(value);
		updateUrl();
	}

	function handleYearlyChange(value: number) {
		yearlyRate = value;
		lastEdited = 'yearly';
		recalculateFromYearly(value);
		updateUrl();
	}

	function handleSettingsChange() {
		// Přepočítej podle posledně editované hodnoty
		if (lastEdited === 'daily') {
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
		params.set('denni', dailyRate.toString());
		params.set('dovolena', vacationDays.toString());
		params.set('fakturovat_svatky', billableHolidays ? '1' : '0');
		params.set('fakturovat_dovolenou', billableVacation ? '1' : '0');

		goto(`?${params.toString()}`, { replaceState: true, keepFocus: true });
	}

	// Inicializace z URL parametrů
	$effect(() => {
		if (browser) {
			const params = $page.url.searchParams;

			const urlYear = params.get('rok');
			const urlDaily = params.get('denni');
			const urlVacation = params.get('dovolena');
			const urlBillableHolidays = params.get('fakturovat_svatky');
			const urlBillableVacation = params.get('fakturovat_dovolenou');

			if (urlYear) year = parseInt(urlYear);
			if (urlVacation) vacationDays = parseInt(urlVacation);
			if (urlBillableHolidays) billableHolidays = urlBillableHolidays === '1';
			if (urlBillableVacation) billableVacation = urlBillableVacation === '1';

			if (urlDaily) {
				dailyRate = parseInt(urlDaily);
				lastEdited = 'daily';
				recalculateFromDaily(dailyRate);
			}
		}
	});

	// Inicializace při prvním renderování
	$effect(() => {
		if (browser && !$page.url.searchParams.has('denni')) {
			recalculateFromDaily(dailyRate);
		}
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
			<label for="vacation">Dny dovolené / volna</label>
			<div class="mt-1"></div>
			<input
				type="number"
				id="vacation"
				name="vacation"
				bind:value={vacationDays}
				min={0}
				max={365}
				oninput={handleSettingsChange}
				class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600"
			/>
		</div>
		<div class="mt-4"></div>

		<div class="mt-4 space-y-3">
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

		<div class="grid gap-6 md:grid-cols-3">
			<div>
				<label for="daily">Denní sazba (Kč)</label>
				<div class="mt-1"></div>
				<input
					type="number"
					id="daily"
					name="daily"
					bind:value={dailyRate}
					min={0}
					oninput={(e: Event) => handleDailyChange(parseInt((e.currentTarget as HTMLInputElement).value) || 0)}
					class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600"
				/>
				<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
					{formatNumber(dailyRate)} Kč / den
				</p>
			</div>

			<div>
				<label for="monthly">Měsíční sazba (Kč)</label>
				<div class="mt-1"></div>
				<input
					type="number"
					id="monthly"
					name="monthly"
					bind:value={monthlyRate}
					min={0}
					oninput={(e: Event) => handleMonthlyChange(parseInt((e.currentTarget as HTMLInputElement).value) || 0)}
					class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600"
				/>
				<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
					{formatNumber(monthlyRate)} Kč / měsíc
				</p>
			</div>

			<div>
				<label for="yearly">Roční sazba (Kč)</label>
				<div class="mt-1"></div>
				<input
					type="number"
					id="yearly"
					name="yearly"
					bind:value={yearlyRate}
					min={0}
					oninput={(e: Event) => handleYearlyChange(parseInt((e.currentTarget as HTMLInputElement).value) || 0)}
					class="w-full rounded-md border border-slate-300 px-4 py-2 shadow dark:border-slate-700 dark:bg-slate-600"
				/>
				<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
					{formatNumber(yearlyRate)} Kč / rok
				</p>
			</div>
		</div>
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
