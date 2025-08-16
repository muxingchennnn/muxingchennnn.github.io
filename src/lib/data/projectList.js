import svelteLogo from "$lib/assets/logo-svelte.svg";
import d3Logo from "$lib/assets/logo-d3js.svg";
import tailwindcssLogo from "$lib/assets/logo-tailwindcss.svg";
import gsapLogo from "$lib/assets/logo-gsap.svg";
import p5Logo from "$lib/assets/logo-p5js.svg";
import jsLogo from "$lib/assets/logo-js.svg";
import htmlLogo from "$lib/assets/logo-html.svg";
import cssLogo from "$lib/assets/logo-css.svg";
import illustratorLogo from "$lib/assets/logo-illustrator.svg";
import indeisgnLogo from "$lib/assets/logo-indesign.svg";
import fimgaLogo from "$lib/assets/logo-figma.svg";
import visualPerceptionMapURL from "$lib/assets/A Concept Map of Visual Perception.pdf";
import bookURL from "$lib/assets/A Brief History of Hurricanes.pdf";

export const projectList = [
	{
		title: "B++: Insects As Proxies of Biodiversity",
		types: ["Scrollytelling", "Web Design & Development"],
		techs: [
			{ techName: "SvelteKit", techLogo: svelteLogo },
			{ techName: "GSAP", techLogo: gsapLogo },
			{ techName: "p5.js", techLogo: p5Logo },
			{ techName: "Tailwind CSS", techLogo: tailwindcssLogo }
		],
		url: "https://senseable.mit.edu/b++/"
	},
	{
		title: "US Hurricane Landfalls Explorer",
		types: ["Interactive Visualization"],
		techs: [
			{ techName: "SvelteKit", techLogo: svelteLogo },
			{ techName: "D3.js", techLogo: d3Logo },
			{ techName: "Tailwind CSS", techLogo: tailwindcssLogo }
		],
		url: "https://us-hurricane-landfalls-v3.vercel.app/"
	},
	{
		title: "Societal Shifts & Literary Evolution Go Hand in Hand",
		types: ["Interactive Article", "Interactive Visualization"],
		techs: [
			{ techName: "SvelteKit", techLogo: svelteLogo },
			{ techName: "D3.js", techLogo: d3Logo },
			{ techName: "Tailwind CSS", techLogo: tailwindcssLogo }
		],
		url: "https://societal-shifts-and-literary-evolution.vercel.app/"
	},
	{
		title: "NSF CISE Awards Search Interface",
		types: ["User Interface"],
		techs: [
			{ techName: "SvelteKit", techLogo: svelteLogo },
			{ techName: "Tailwind CSS", techLogo: tailwindcssLogo }
		],
		url: "https://nsf-search-interface.vercel.app/"
	},
	{
		title: "Into the Loop: MFA Thesis Exhibition 2023",
		types: ["Web Design & Development"],
		techs: [
			{ techName: "Javascript", techLogo: jsLogo },
			{ techName: "HTML", techLogo: htmlLogo },
			{ techName: "CSS", techLogo: cssLogo },
			{ techName: "GSAP", techLogo: gsapLogo }
		],
		url: "https://camd-mfa-exhibition-2023.vercel.app/"
	},
	{
		title: "A Map of Figma",
		types: ["Concept Map"],
		techs: [{ techName: "Figma", techLogo: fimgaLogo }],
		url: "https://www.figma.com/design/PcW67YqcnwyzwfZsT7HfDB/All-Things-Figma?node-id=297-4134&t=vtFlOHuDIxQJInoU-1"
	},
	{
		title: "A Map of Visual Perception",
		types: ["Concept Map"],
		techs: [{ techName: "Adobe Illustrator", techLogo: illustratorLogo }],
		url: visualPerceptionMapURL
	},
	{
		title: "A Brief History of Hurricanes",
		types: ["Book Design", "Static Visualization"],
		techs: [
			{ techName: "Adobe Illustrator", techLogo: illustratorLogo },
			{ techName: "Adobe Indesign", techLogo: indeisgnLogo }
		],
		url: bookURL
	}

	// {
	// 	id: 4,
	// 	title: "Visualizing Bird Strikes",
	// 	types: ["Static Visualization"],
	// 	techs: ["Adobe Illustrator"],
	// 	url: "Visualizing Bird Strikes.pdf"
	// },
	// {
	// 	id: 5,
	// 	title: "A Map of Visual Perception",
	// 	types: ["Concept Map"],
	// 	techs: ["Adobe Illustrator"],
	// 	url: "/A Concept Map of Visual Perception.pdf"
	// },
	// {
	// 	id: 6,
	// 	title: "A Brief History of Hurricanes",
	// 	types: ["Book Design", "Static Visualization"],
	// 	techs: ["Adobe Indesign", "Adobe Illustrator"],
	// 	url: "/A Brief History of Hurricanes.pdf"
	// }
];
