export interface TouchpointSpeaker {
	name: string;
	role?: string;
	company?: string;
	image?: string;
	topic: string;
	date: string;
}

export const TOUCHPOINT_SPEAKERS: TouchpointSpeaker[] = [
	{
		name: 'Max Körbächer',
		role: 'Founder & Chief Technology Advisor',
		company: 'Liquid Reply',
		image: 'https://max.koerbaecher.io/_astro/max-profil.CuRaYPSR_Z187njP.webp',
		topic: 'The Infrastructure Factory',
		date: '2026-11-11'
	},
	{
		name: 'Kate Astrid',
		role: 'Senior Product Engineer',
		image:
			'https://media.licdn.com/dms/image/v2/D4D03AQGZRGzmd91xmg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1690234411874?e=1795651200&v=beta&t=dzjYFlWVx3vQHqdOPdF9LbPk2yvx4TAvKHXlJ6Qxv6Y',
		topic: 'From Slides to Websites',
		date: '2026-11-25'
	},
	{
		name: 'Raul Jimenez Ortega',
		company: 'Esri',
		image:
			'https://media.licdn.com/dms/image/v2/D4E03AQFjMxWFiDhMWg/profile-displayphoto-shrink_200_200/B4EZdeZo3AHIBk-/0/1749635469121?e=1795651200&v=beta&t=wXSfNrqPCYPhqE3EqnAjA-ObzEJD4_LrLYvWribDBrg',
		topic: 'OpenTechEvents Specification',
		date: '2026-12-09'
	},
	{
		name: 'Waldek Mastykarz',
		role: 'Developer Advocate',
		company: 'Microsoft',
		image:
			'https://media.licdn.com/dms/image/v2/D4E03AQGc0p-IE8BJeQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1687003102248?e=1795651200&v=beta&t=Wzud_bKo4LoxvdA15MymTOXGFEZ5CReZQ-KJMKNLhDE',
		topic: 'AI agents are your new developer audience',
		date: '2026-12-16'
	},
	{
		name: 'Garry Trinder',
		role: 'Senior Cloud Advocate',
		company: 'Microsoft',
		image:
			'https://media.licdn.com/dms/image/v2/D4E03AQFl6fMeu-TVtA/profile-displayphoto-crop_800_800/B4EaCuq_46KEAI-/0/1789636903874?e=1796256000&v=beta&t=5InmqjFBv-nDc4ZAEFSgUrKiEnbnT1_49OdJv8EcN7I',
		topic: 'AI agents are your new developer audience',
		date: '2026-12-16'
	},
	{
		name: 'Marcos Placona',
		image:
			'https://media.licdn.com/dms/image/v2/C4E03AQGDQmsb7kgGSg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1647423969474?e=1796256000&v=beta&t=t9ZYwJ7aTvNAuv4IcC4qonmffuDqyqeKynolAOER4z0',
		topic: 'Write it down once: giving DevRel agents the context they keep asking for',
		date: '2027-01-13'
	}
];

export const OPEN_SLOT_LABEL = 'January 2027';
