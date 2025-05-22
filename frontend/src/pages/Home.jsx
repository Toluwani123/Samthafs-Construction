import React, {useState, useEffect, use} from 'react'
import publicApi from '../api';
import { FaChevronDown } from "react-icons/fa";
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';

function Home() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("all");
    const [quoteModal, setQuoteModal] = useState(false);
    const [contactModal, setContactModal] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const [quoteSent, setQuoteSent] = useState(false);
    const [activePage, setActivePage] = useState("home");
    const [projects, setProjects] = useState([]);
    const [quote, setQuote] = useState({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        location: "",
        budget: "",
        description: "",
    });
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleQuoteChange = (e) => {
        setQuote({
            ...quote,
            [e.target.name]: e.target.value,
        });
    };
    const handleContactChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value,
        });
    };
    const handleQuoteSubmit = async e => {
        e.preventDefault();
        try {
        const { status } = await publicApi.post('/quote/', quote);
        if (status === 201) {
            setQuoteModal(false);
            setQuoteSent(true);
            setQuote({
            name: '', email: '', phone: '',
            projectType: '', location: '',
            budget: '', description: '',
            });
        }
        } catch (err) { console.error('Error sending quote:', err); }
    };
    const handleContactSubmit = async e => {
        e.preventDefault();
        try {
        const { status } = await publicApi.post('/contact/', contact);
        if (status === 201) {
            setContactModal(false);
            setMessageSent(true);
            setContact({ name: '', email: '', phone: '', subject: '', message: '' });
        }
        } catch (err) { console.error('Error sending contact message:', err); }
    };
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    /*useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await publicApi.get("/projects/");
                if (response.status === 200) {
                    setProjects(response.data);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);*/



  return (
    <div className='min-h-screen font-sans text-gray-800'>
        <MenuBar 
            isScrolled={scrolled} 
            setActivePage={setActivePage} 
            setIsQuoteModalOpen={setQuoteModal} 
            setIsContactModalOpen={setContactModal} 
            activePage={activePage}
        />
        <main>
            <section id='home' className='relative h-screen flex items-center'>
                <div className='absolute inset-0 overflow-hidden'>
                    <img src="/images/home-bg.jpg" alt="Background" className='w-full h-full object-cover object-top' />
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent'></div>
                </div>
                <div className='container mx-auto px-6 relative z-10'>
                    <div className='max-w-2xl text-white'>
                        <h1 className='text-5xl md:text-6xl font-bold mb-4'>Building Tomorrows Landmarks Today</h1>
                        <p className='text-xl mb-8'>
                            Excellence in construction is not just a goal; it's our commitment. We bring your vision to life with precision and care, ensuring every detail is perfect.
                        </p>
                        <button className='!rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium transition-colors cursor-pointer'>
                            View Our Projects
                        </button>
                    </div>
                </div>
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
                    <FaChevronDown />
                </div>
            </section>
        </main>
        <Footer
            setActivePage={setActivePage}
            setIsContactModalOpen={setContactModal}
        />
        
    
    </div>
  )
}

export default Home