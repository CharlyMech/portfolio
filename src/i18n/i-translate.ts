export interface Translations {
	nav: { home: string; projects: string; services: string; blog: string };
	site: { title: string; description: string };
	hero: {
		name: string;
		nickName: string;
		title: string;
		subtitle: string;
		bio: string;
		currentStatus: string;
		availableForHire: string;
		availableForFreelance: string;
		notAvailableForHire: string;
		notAvailableForFreelance: string;
		busy: string;
		localTime: string;
		weather: string;
		location: string;
	};
	infrastructure: {
		heading: string;
		systemReport: string;
		logHistory: string;
		viewAll: string;
	};
	skillTier: { primary: string; secondary: string; familiar: string };
	cta: { heading: string; subheading: string; button: string };
	experience: {
		pageTitle: string;
		pageDescription: string;
		label: string;
		title: string;
		subtitle: string;
	};
	projects: {
		pageTitle: string;
		pageDescription: string;
		label: string;
		title: string;
		subtitle: string;
		status: { live: string; wip: string; archived: string };
		viewProject: string;
		viewCode: string;
		featured: string;
	};
	services: {
		pageTitle: string;
		pageDescription: string;
		label: string;
		title: string;
		subtitle: string;
		deliverables: string;
		getInTouch: string;
		allServicesInclude: string;
		includes: string[];
	};
	blog: {
		pageTitle: string;
		pageDescription: string;
		label: string;
		title: string;
		subtitle: string;
		readMore: string;
		minRead: string;
	};
	tech: {
		pageTitle: string;
		pageDescription: string;
		label: string;
		title: string;
		subtitle: string;
	};
	contact: {
		pageTitle: string;
		pageDescription: string;
		label: string;
		title: string;
		subtitle: string;
		sendTransmission: string;
		formSubtitle: string;
		name: string;
		email: string;
		subject: string;
		message: string;
		subjectPlaceholder: string;
		messagePlaceholder: string;
		sendMessage: string;
		sending: string;
		transmissionReceived: string;
		replyPromise: string;
		sendAnother: string;
		directContact: string;
		findMeOnline: string;
		baseOfOperations: string;
		timezone: string;
	};
	notFound: {
		title: string;
		heading: string;
		subheading: string;
		back: string;
	};
	skillLevel: {
		expert: string;
		proficient: string;
		learning: string;
		all: string;
		skills: string;
	};
	experienceSection: {
		experience: string;
		education: string;
		techStack: string;
		fullList: string;
		entries: string;
		current: string;
	};
	lang: { switchTo: string; en: string; es: string };
}
