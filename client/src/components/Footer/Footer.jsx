import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    {/* Left Section */}
                    <div className="mb-4 lg:mb-0">
                        <h5 className="text-lg font-bold">Pavan Official</h5>
                        <p className="text-sm">Delivering quality solutions with passion and dedication.</p>
                    </div>

                    {/* Navigation Links */}
                    <div className="mb-4 lg:mb-0">
                        <ul className="flex space-x-4 text-sm">
                            <li><a href="/" className="hover:text-gray-300">Home</a></li>
                            <li><a href="/about" className="hover:text-gray-300">About</a></li>
                            <li><a href="/services" className="hover:text-gray-300">Services</a></li>
                            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex space-x-4">
                        <a href="https://twitter.com" aria-label="Twitter" className="hover:text-gray-300">
                            <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 4.557a9.916 9.916 0 0 1-2.828.775 4.924 4.924 0 0 0 2.165-2.717 9.86 9.86 0 0 1-3.127 1.196 4.916 4.916 0 0 0-8.374 4.482A13.934 13.934 0 0 1 1.671 3.149a4.915 4.915 0 0 0 1.524 6.553 4.903 4.903 0 0 1-2.229-.617v.063a4.916 4.916 0 0 0 3.946 4.814 4.936 4.936 0 0 1-2.224.085 4.918 4.918 0 0 0 4.589 3.417A9.875 9.875 0 0 1 0 19.54a13.924 13.924 0 0 0 7.548 2.213c9.058 0 14.01-7.504 14.01-14.009 0-.213-.005-.425-.014-.637A10.004 10.004 0 0 0 24 4.557z" /></svg>
                        </a>
                        <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-gray-300">
                            <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.792 0 0 .774 0 1.727V22.27C0 23.224.792 24 1.77 24h20.46C23.208 24 24 23.225 24 22.272V1.727C24 .774 23.208 0 22.23 0zM7.093 20.452H3.579V9.002h3.514v11.45zM5.334 7.633c-1.126 0-2.04-.914-2.04-2.04 0-1.126.914-2.04 2.04-2.04 1.127 0 2.04.914 2.04 2.04 0 1.127-.913 2.04-2.04 2.04zm15.118 12.819h-3.514v-5.569c0-1.328-.026-3.04-1.852-3.04-1.853 0-2.137 1.447-2.137 2.943v5.666h-3.515V9.002h3.374v1.563h.049c.469-.888 1.615-1.824 3.322-1.824 3.553 0 4.206 2.341 4.206 5.384v6.327z" /></svg>
                        </a>
                        <a href="https://github.com" aria-label="GitHub" className="hover:text-gray-300">
                            <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.17c-3.338.725-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.084-.729.084-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.305 3.495.998.107-.775.418-1.305.76-1.605-2.665-.305-5.466-1.335-5.466-5.93 0-1.31.465-2.382 1.235-3.221-.123-.305-.535-1.527.117-3.176 0 0 1.008-.323 3.3 1.23.957-.266 1.98-.399 3-.405 1.02.006 2.043.139 3 .405 2.29-1.553 3.297-1.23 3.297-1.23.653 1.648.242 2.87.12 3.176.772.839 1.235 1.911 1.235 3.221 0 4.61-2.807 5.623-5.479 5.92.43.37.814 1.102.814 2.222v3.293c0 .322.217.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                        </a>
                    </div>
                </div>

                <div className="text-center mt-4 text-sm">
                    &copy; Copyright by Pavan 2024. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
