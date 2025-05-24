import { FaBuilding, FaHome, FaIndustry, FaPaintRoller, FaTree } from 'react-icons/fa';

export const ACCESS_TOKEN = 'access';
export const REFRESH_TOKEN = 'refresh';
export const API_URL = "http://localhost:8000/api";

export const services = [
    {
        Icon: FaBuilding,
        title: 'Commercial Construction',
        desc:
        'From office buildings to retail spaces, we deliver commercial projects that combine functionality with architectural excellence.',
        features: [
            'Ground-up construction',
            'Design-build delivery',
            'Tenant fit-outs and remodels',
        ],
        id: 'commercial-construction',
    },
    {
        Icon: FaHome,
        title: 'Residential Development',
        features: [
            'Custom single-family homes',
            'Multi-unit developments',
            'Green building practices',
        ],
        id: 'residential-development',
        desc:
        'Creating beautiful, sustainable homes and residential complexes that enhance quality of life and community values.',
    },
    {
        Icon: FaIndustry,
        features: [
            'Factory and warehouse builds',
            'Process-driven planning',
            'Heavy-equipment coordination',
        ],
        id: 'industrial-construction',
        title: 'Industrial Construction',
        desc:
        'Specialized construction for manufacturing, logistics, and industrial facilities with a focus on efficiency and durability.',
    },
    {
        Icon: FaPaintRoller,
        title: 'Interior Works',
        features: [
            'Drywall, trim & millwork',
            'Electrical & plumbing fit-outs',
            'Custom finish carpentry',
        ],
        id: 'interior-works',
        desc:
        'From drywall and millwork to bespoke finishes and MEP fit-outs, we customize every interior space for style, comfort, and code compliance.',
    },
    {
        Icon: FaTree,
        title: 'Exterior Construction',
        features: [
            'Roofing & waterproofing',
            'Masonry & cladding',
            'Sitework & landscaping',
        ],
        id: 'exterior-construction',
        desc:
        'Façade restoration, roofing, cladding, hardscapes, and landscaping—ensuring curb appeal, weather-resistance, and long-term performance.',
    },
];