'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { Phone, Mail, MessageCircle, HelpCircle, ChevronDown, ChevronUp, Send, X } from 'lucide-react';
import { useState } from 'react';

export default function SupportPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'agent', text: 'Hi there! How can I assist you with your personal account today?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { sender: 'user', text: input }]);
        setInput('');
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'agent', text: 'Thanks for reaching out. Let me check that for you.' }]);
        }, 1000);
    };

    const faqs = [
        {
            q: "How do I reset my account PIN?",
            a: "Go to ‘Settings’ > ‘Security’ and select ‘Change PIN’. If you forgot your PIN, please call our helpline at 16247 for identity verification."
        },
        {
            q: "What is the daily Send Money limit?",
            a: "For personal accounts, the daily Send Money limit is ৳25,000 and the monthly limit is ৳200,000."
        },
        {
            q: "Are there any hidden charges?",
            a: "No, PayFlow is transparent. Send Money is free up to ৳1000/month. Cash Out charge is 1.85%."
        },
        {
            q: "How can I add money from my bank card?",
            a: "Tap on ‘Add Money’ on the dashboard, select ‘Card to Wallet’, choose your bank, and follow the instructions."
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pb-24">
            <SubPageHeader title="Support Center" />

            <div className="max-w-md mx-auto px-4 space-y-8">

                {/* Contact Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <a href="tel:16247" className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="w-14 h-14 bg-[#E2136E]/10 rounded-full flex items-center justify-center text-[#E2136E] group-hover:scale-110 transition-transform">
                            <Phone className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 dark:text-white">Call Center</h3>
                            <p className="text-xs text-gray-500 mt-1">16247</p>
                        </div>
                        <span className="text-sm font-bold text-[#E2136E] mt-2 group-hover:underline">Call Now</span>
                    </a>

                    <button onClick={() => setIsChatOpen(true)} className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                            <MessageCircle className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 dark:text-white">Live Chat</h3>
                            <p className="text-xs text-gray-500 mt-1">Instant Support</p>
                        </div>
                        <span className="text-sm font-bold text-emerald-600 mt-2 group-hover:underline">Start Chat</span>
                    </button>

                    <a href="mailto:support@payflow.com" className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                            <Mail className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 dark:text-white">Email Us</h3>
                            <p className="text-xs text-gray-500 mt-1">support@payflow.com</p>
                        </div>
                        <span className="text-sm font-bold text-orange-500 mt-2 group-hover:underline">Send Email</span>
                    </a>

                    <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm flex flex-col items-center text-center gap-4 border-2 border-[#E2136E]/10">
                        <div className="w-14 h-14 bg-[#E2136E]/10 rounded-full flex items-center justify-center text-[#E2136E]">
                            <HelpCircle className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 dark:text-white">FAQs</h3>
                            <p className="text-xs text-gray-500 mt-1">See below</p>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="space-y-4">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white px-2">Common Questions</h3>
                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white dark:bg-[#1e293b] rounded-2xl overflow-hidden shadow-sm">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-left"
                                >
                                    <span className="font-bold text-gray-700 dark:text-gray-200 text-sm md:text-base">{faq.q}</span>
                                    {openFaq === index ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                </button>
                                {openFaq === index && (
                                    <div className="p-4 pt-0 bg-white dark:bg-[#1e293b] text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Floating Chat Widget */}
            {isChatOpen && (
                <div className="fixed bottom-0 left-0 right-0 md:absolute md:bottom-20 md:right-4 top-0 md:top-auto z-50 flex flex-col items-end justify-end pointer-events-none md:pointer-events-auto">
                    <div className="w-full md:w-96 h-full md:h-[500px] bg-white dark:bg-[#1e293b] md:rounded-2xl shadow-2xl flex flex-col pointer-events-auto border border-gray-100 dark:border-slate-800">

                        {/* Chat Header */}
                        <div className="bg-[#E2136E] p-4 text-white flex justify-between items-center md:rounded-t-2xl">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse absolute right-0 bottom-0 border border-[#E2136E]"></div>
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">PayFlow Support</h3>
                                    <p className="text-[10px] opacity-80">Typically replies in 2 mins</p>
                                </div>
                            </div>
                            <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 dark:bg-slate-900/50">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-[#E2136E] text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chat Input */}
                        <div className="p-3 bg-white dark:bg-[#1e293b] border-t border-gray-100 dark:border-slate-800 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type a message..."
                                className="flex-1 bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#E2136E]/20"
                            />
                            <button onClick={handleSend} className="p-2 bg-[#E2136E] text-white rounded-xl hover:bg-[#c2105e] transition-colors">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
