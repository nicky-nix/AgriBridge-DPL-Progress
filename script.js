/* ==========================================================
   AgriBridge DPL — shared behaviour
   1) Mobile nav toggle   2) Footer year
   3) Featured listings + impact stats (live API, with sample fallback)
   ========================================================== */

/* ---- CONNECT YOUR BACKEND HERE ----
   Point these at your real endpoints. Expected JSON shapes:

   GET listingsEndpoint  ->  [{ name, quantity, unit, supplier, distanceKm,
                                price, originalPrice, priceUnit, hoursLeft,
                                tone ("red"|"green"|"yellow"|"orange"), image?, url? }]
   GET statsEndpoint     ->  { kgSaved, activeSellers, activeBuyers }

   If a request fails (or apiBase is empty) the sample data below is shown
   and a "sample data" note appears. Remove SAMPLE_* once you go live.        */
const CONFIG = {
	apiBase: "", // e.g. "https://api.yourdomain.com"
	listingsEndpoint: "/api/listings/featured",
	allListingsEndpoint: "/api/listings", // marketplace page: all live listings
	contactEndpoint: "/api/contact", // contact form: POST JSON
	statsEndpoint: "/api/stats",
	timeoutMs: 4000,
};

const SAMPLE_LISTINGS = [
	{
		name: "Tomatoes",
		quantity: 40,
		unit: "kg",
		supplier: "Greenfield Coop",
		distanceKm: 2.1,
		price: 18,
		originalPrice: 30,
		priceUnit: "kg",
		hoursLeft: 5,
		tone: "red",
	},
	{
		name: "Kangkong",
		quantity: 25,
		unit: "bundles",
		supplier: "Sta. Isabel Farm",
		distanceKm: 3.4,
		price: 8,
		originalPrice: 15,
		priceUnit: "bundle",
		hoursLeft: 9,
		tone: "green",
	},
	{
		name: "Saba banana",
		quantity: 60,
		unit: "kg",
		supplier: "Polanco Growers",
		distanceKm: 6.0,
		price: 22,
		originalPrice: 32,
		priceUnit: "kg",
		hoursLeft: 30,
		tone: "yellow",
	},
	{
		name: "Sweet potato",
		quantity: 80,
		unit: "kg",
		supplier: "Dapitan Farmers",
		distanceKm: 8.2,
		price: 14,
		originalPrice: 20,
		priceUnit: "kg",
		hoursLeft: 72,
		tone: "orange",
	},
];
const SAMPLE_STATS = { kgSaved: 0, activeSellers: 0, activeBuyers: 0 }; // replace with real numbers or leave 0 before launch

/* ---- helpers ---- */
function fetchJSON(path) {
	if (!CONFIG.apiBase) return Promise.reject(new Error("No API configured"));
	const ctrl = new AbortController();
	const t = setTimeout(() => ctrl.abort(), CONFIG.timeoutMs);
	return fetch(CONFIG.apiBase + path, {
		signal: ctrl.signal,
		headers: { Accept: "application/json" },
	})
		.then((r) => {
			if (!r.ok) throw new Error("HTTP " + r.status);
			return r.json();
		})
		.finally(() => clearTimeout(t));
}
function el(tag, cls, text) {
	const n = document.createElement(tag);
	if (cls) n.className = cls;
	if (text !== undefined) n.textContent = text; // textContent keeps API data safe from HTML injection
	return n;
}
function timeLeft(h) {
	if (h < 24) return { label: `Expires in ${h}h`, cls: "pill--urgent" };
	const d = Math.round(h / 24);
	return {
		label: `${d} day${d > 1 ? "s" : ""} left`,
		cls: d <= 1 ? "pill--soon" : "pill--ok",
	};
}
const peso = (n) => "₱" + Number(n).toLocaleString("en-PH");

/* ---- listing card ---- */
function buildCard(l, opts = {}) {
	const off = Math.round((1 - l.price / l.originalPrice) * 100);
	const card = el("article", "listing-card");
	const media = el("div", "lc-media tone-" + (l.tone || "green"));
	if (l.image) {
		const img = el("img");
		img.src = l.image;
		img.alt = l.name;
		img.loading = "lazy";
		media.append(img);
	} else media.append(el("span", "lc-shape"));
	media.append(el("span", "badge", "-" + off + "%"));
	const body = el("div", "lc-body");
	body.append(el("div", "lc-title", `${l.name}, ${l.quantity} ${l.unit}`));
	body.append(el("div", "lc-meta", `${l.supplier} · ${l.distanceKm} km away`));
	const price = el("div", "lc-price");
	price.append(
		el("strong", null, `${peso(l.price)}/${l.priceUnit}`),
		el("s", null, peso(l.originalPrice)),
	);
	body.append(price);
	const foot = el("div", "lc-foot");
	const tl = timeLeft(l.hoursLeft);
	foot.append(el("span", "pill " + tl.cls, tl.label));
	const a = el("a", "btn btn--primary btn--sm", opts.label || "View");
	a.href = opts.href || l.url || "marketplace.html";
	foot.append(a);
	body.append(foot);
	card.append(media, body);
	return card;
}
function renderListings(list) {
	const grid = document.getElementById("featured-grid");
	if (!grid) return;
	grid.replaceChildren(...list.slice(0, 4).map(buildCard));
}

/* ---- impact stats ---- */
function countUp(node, target) {
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (reduce || target === 0) {
		node.textContent = Number(target).toLocaleString("en-PH");
		return;
	}
	const start = performance.now(),
		dur = 1400;
	(function tick(now) {
		const p = Math.min((now - start) / dur, 1);
		node.textContent = Math.round(
			target * (1 - Math.pow(1 - p, 3)),
		).toLocaleString("en-PH");
		if (p < 1) requestAnimationFrame(tick);
	})(start);
}
function renderStats(s) {
	document.querySelectorAll("[data-stat]").forEach((n) => {
		const io = new IntersectionObserver(
			(entries, obs) => {
				if (entries[0].isIntersecting) {
					countUp(n, Number(s[n.dataset.stat]) || 0);
					obs.disconnect();
				}
			},
			{ threshold: 0.4 },
		);
		io.observe(n);
	});
}

/* ---- boot ---- */
document.addEventListener("DOMContentLoaded", () => {
	const y = document.getElementById("year");
	if (y) y.textContent = new Date().getFullYear();

	const toggle = document.querySelector(".nav-toggle"),
		links = document.getElementById("nav-links");
	if (toggle && links) {
		toggle.addEventListener("click", () => {
			const open = links.classList.toggle("open");
			toggle.setAttribute("aria-expanded", open);
		});
	}

	if (document.getElementById("featured-grid")) {
		fetchJSON(CONFIG.listingsEndpoint)
			.then(renderListings)
			.catch(() => {
				document.body.classList.add("using-sample");
				renderListings(SAMPLE_LISTINGS);
			});
	}
	if (document.querySelector("[data-stat]")) {
		fetchJSON(CONFIG.statsEndpoint)
			.then(renderStats)
			.catch(() => {
				document.body.classList.add("using-sample");
				renderStats(SAMPLE_STATS);
			});
	}
});

/* ==========================================================
   Marketplace page: search, filter, sort (client-side)
   ========================================================== */
const SAMPLE_ALL = [
	{
		name: "Tomatoes",
		category: "Vegetables",
		quantity: 40,
		unit: "kg",
		supplier: "Greenfield Coop",
		distanceKm: 2.1,
		price: 18,
		originalPrice: 30,
		priceUnit: "kg",
		hoursLeft: 5,
		tone: "red",
	},
	{
		name: "Kangkong",
		category: "Vegetables",
		quantity: 25,
		unit: "bundles",
		supplier: "Sta. Isabel Farm",
		distanceKm: 3.4,
		price: 8,
		originalPrice: 15,
		priceUnit: "bundle",
		hoursLeft: 9,
		tone: "green",
	},
	{
		name: "Saba banana",
		category: "Fruits",
		quantity: 60,
		unit: "kg",
		supplier: "Polanco Growers",
		distanceKm: 6.0,
		price: 22,
		originalPrice: 32,
		priceUnit: "kg",
		hoursLeft: 30,
		tone: "yellow",
	},
	{
		name: "Sweet potato",
		category: "Root crops",
		quantity: 80,
		unit: "kg",
		supplier: "Dapitan Farmers",
		distanceKm: 8.2,
		price: 14,
		originalPrice: 20,
		priceUnit: "kg",
		hoursLeft: 72,
		tone: "orange",
	},
	{
		name: "Pechay",
		category: "Vegetables",
		quantity: 30,
		unit: "bundles",
		supplier: "Sta. Isabel Farm",
		distanceKm: 3.4,
		price: 6,
		originalPrice: 10,
		priceUnit: "bundle",
		hoursLeft: 10,
		tone: "green",
	},
	{
		name: "Cabbage",
		category: "Vegetables",
		quantity: 50,
		unit: "kg",
		supplier: "Dapitan Farmers",
		distanceKm: 8.2,
		price: 12,
		originalPrice: 18,
		priceUnit: "kg",
		hoursLeft: 48,
		tone: "green",
	},
	{
		name: "Ripe mango",
		category: "Fruits",
		quantity: 35,
		unit: "kg",
		supplier: "Piñan Farm Coop",
		distanceKm: 11.5,
		price: 45,
		originalPrice: 70,
		priceUnit: "kg",
		hoursLeft: 14,
		tone: "yellow",
	},
	{
		name: "Papaya",
		category: "Fruits",
		quantity: 28,
		unit: "kg",
		supplier: "Greenfield Coop",
		distanceKm: 2.1,
		price: 16,
		originalPrice: 25,
		priceUnit: "kg",
		hoursLeft: 20,
		tone: "orange",
	},
	{
		name: "Cassava",
		category: "Root crops",
		quantity: 120,
		unit: "kg",
		supplier: "Polanco Growers",
		distanceKm: 6.0,
		price: 10,
		originalPrice: 16,
		priceUnit: "kg",
		hoursLeft: 96,
		tone: "orange",
	},
	{
		name: "Eggplant",
		category: "Vegetables",
		quantity: 22,
		unit: "kg",
		supplier: "Piñan Farm Coop",
		distanceKm: 11.5,
		price: 20,
		originalPrice: 35,
		priceUnit: "kg",
		hoursLeft: 7,
		tone: "red",
	},
	{
		name: "Calamansi",
		category: "Fruits",
		quantity: 18,
		unit: "kg",
		supplier: "Dapitan Farmers",
		distanceKm: 8.2,
		price: 30,
		originalPrice: 48,
		priceUnit: "kg",
		hoursLeft: 36,
		tone: "green",
	},
	{
		name: "Ampalaya",
		category: "Vegetables",
		quantity: 15,
		unit: "kg",
		supplier: "Sta. Isabel Farm",
		distanceKm: 3.4,
		price: 28,
		originalPrice: 45,
		priceUnit: "kg",
		hoursLeft: 11,
		tone: "green",
	},
];

function initMarketplace() {
	const grid = document.getElementById("market-grid");
	if (!grid) return;
	let all = [];
	const q = document.getElementById("f-search"),
		cat = document.getElementById("f-cat"),
		dist = document.getElementById("f-dist"),
		sort = document.getElementById("f-sort"),
		soon = document.getElementById("f-soon"),
		count = document.getElementById("result-count"),
		empty = document.getElementById("empty-state");

	function apply() {
		const term = q.value.trim().toLowerCase();
		let list = all.filter(
			(l) =>
				(!term || (l.name + " " + l.supplier).toLowerCase().includes(term)) &&
				(cat.value === "all" || l.category === cat.value) &&
				(dist.value === "all" || l.distanceKm <= Number(dist.value)) &&
				(!soon.checked || l.hoursLeft <= 12),
		);
		const by = {
			nearest: (a, b) => a.distanceKm - b.distanceKm,
			expiring: (a, b) => a.hoursLeft - b.hoursLeft,
			discount: (a, b) =>
				1 - b.price / b.originalPrice - (1 - a.price / a.originalPrice),
			price: (a, b) => a.price - b.price,
		};
		list.sort(by[sort.value] || by.expiring);
		grid.replaceChildren(
			...list.map((l) =>
				buildCard(l, { href: "login.html?role=buyer", label: "Order" }),
			),
		);
		count.textContent =
			list.length + (list.length === 1 ? " listing" : " listings") + " found";
		empty.classList.toggle("show", list.length === 0);
	}
	[q, cat, dist, sort, soon].forEach((n) => n.addEventListener("input", apply));

	fetchJSON(CONFIG.allListingsEndpoint)
		.then((d) => {
			all = d;
			apply();
		})
		.catch(() => {
			document.body.classList.add("using-sample");
			all = SAMPLE_ALL;
			apply();
		});
}

/* ==========================================================
   Contact form
   ========================================================== */
function initContact() {
	const form = document.getElementById("contact-form");
	if (!form) return;
	const status = document.getElementById("form-status");
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}
		const data = Object.fromEntries(new FormData(form));
		const done = (msg) => {
			status.textContent = msg;
			status.classList.add("show");
			form.reset();
		};
		if (!CONFIG.apiBase) {
			done(
				"Thanks! This is a demo, so nothing was sent yet. Connect contactEndpoint in script.js to receive messages.",
			);
			return;
		}
		fetch(CONFIG.apiBase + CONFIG.contactEndpoint, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		})
			.then((r) => {
				if (!r.ok) throw new Error();
				done("Thanks! We received your message and will reply soon.");
			})
			.catch(() => {
				status.textContent =
					"Sorry, something went wrong. Please email us directly.";
				status.classList.add("show");
			});
	});
}

/* ==========================================================
   How It Works: tabs
   ========================================================== */
function initTabs() {
	const tabs = document.querySelectorAll(".tab");
	if (!tabs.length) return;
	tabs.forEach((t) =>
		t.addEventListener("click", () => {
			tabs.forEach((x) => {
				x.setAttribute("aria-selected", x === t);
			});
			document.querySelectorAll(".tab-panel").forEach((p) => {
				p.hidden = p.id !== t.dataset.panel;
			});
		}),
	);
}

document.addEventListener("DOMContentLoaded", () => {
	initMarketplace();
	initContact();
	initTabs();
});
