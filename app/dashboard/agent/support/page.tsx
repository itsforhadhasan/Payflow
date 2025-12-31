'use client';

import { useState } from 'react';
import { SubPageHeader } from '@/components/sub-page-header';
import { Phone, Mail, MessageCircle, HelpCircle, Send, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AgentSupportPage() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'agent', text: 'Hi! How can I assist you with your agent account today?', time: 'Just now' }
    ]);
    const [input, setInput] = useState('');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { sender: 'user', text: input, time: 'Just now' }]);
        setInput('');
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'agent', text: 'Thanks for reaching out. Let me check that for you.', time: 'Just now' }]);
        }, 1000);
    };

    const faqs = [
        {
            q: "How do I update my agent profile?",
            a: "Go to Settings > Profile Settings and update your store name, phone number, and email address. Click Save Changes when done."
        },
        {
            q: "What are the commission rates?",
            a: "Commission rates vary based on transaction volume. Standard rate is 1.5% for cash-in and 1.85% for cash-out transactions. Higher volume agents may qualify for better rates."
        },
        {
            q: "How to handle cash-out requests?",
            a: "When a customer requests cash-out, verify their identity and transaction details. Process the payment and confirm completion. All transactions are recorded in your History section."
        },
        {
            q: "How do I change my PIN?",
            a: "Go to Settings > Security > Change PIN. Enter your current PIN, then your new PIN twice to confirm. Make sure to use a secure PIN that you can remember."
        },
        {
            q: "What should I do if I encounter a problem?",
            a: "You can contact support via phone (16247), email (support@payflow.com), or use the Live Chat feature for immediate assistance. Our support team is available 24/7."
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pb-24">
            <SubPageHeader title="Support Center" backLink="/dashboard/agent" className="bg-emerald-600" />

            <div className="max-w-md mx-auto px-4 space-y-8">
                {/* Contact Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => window.location.href = 'tel:16247'}
                        className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col items-center gap-3 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors active:scale-95"
                    >
                        <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <Phone className="w-7 h-7" />
                        </div>
                        <p className="font-bold text-gray-800 dark:text-white text-sm">Call Us</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400">16247</p>
                    </button>

                    <button 
                        onClick={() => window.location.href = 'mailto:support@payflow.com'}
                        className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col items-center gap-3 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors active:scale-95"
                    >
                        <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <Mail className="w-7 h-7" />
                        </div>
                        <p className="font-bold text-gray-800 dark:text-white text-sm">Email</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400">support@payflow.com</p>
                    </button>
                </div>

                {/* Live Chat */}
                <button 
                    onClick={() => setIsChatOpen(true)}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl p-6 shadow-lg flex items-center gap-4 hover:from-emerald-700 hover:to-emerald-800 transition-colors active:scale-95"
                >
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                        <MessageCircle className="w-7 h-7" />
                    </div>
                    <div className="flex-1 text-left">
                        <p className="font-bold text-lg">Live Chat</p>
                        <p className="text-emerald-100 text-xs">Chat with our support team</p>
                    </div>
                </button>

                {/* FAQ */}
                <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                        <HelpCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        <h3 className="font-bold text-gray-800 dark:text-white">Frequently Asked Questions</h3>
                    </div>
                    <div className="space-y-2">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-100 dark:border-slate-800 last:border-0">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
                                >
                                    <p className="text-sm font-bold text-gray-800 dark:text-white text-left flex-1">{faq.q}</p>
                                    {openFaq === index ? (
                                        <ChevronUp className="w-4 h-4 text-gray-400 ml-2 shrink-0" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 text-gray-400 ml-2 shrink-0" />
                                    )}
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-3 pb-3 text-xs text-gray-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Live Chat Modal */}
            <AnimatePresence>
                {isChatOpen && (
                    <>
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => setIsChatOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e293b] rounded-t-3xl z-50 flex flex-col h-[80vh] max-h-[600px]"
                        >
                            {/* Chat Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
                                        <MessageCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 dark:text-white">Support Team</p>
                                        <p className="text-xs text-gray-500 dark:text-slate-400">Online</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsChatOpen(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={msg.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}
                                    >
                                        <div
                                            className={msg.sender === 'user'
                                                ? "bg-emerald-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]"
                                                : "bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-white rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]"
                                            }
                                        >
                                            <p className="text-sm">{msg.text}</p>
                                            <p className="text-[10px] opacity-70 mt-1">{msg.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-gray-100 dark:border-slate-800">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Type your message..."
                                        className="flex-1 px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white text-sm"
                                    />
                                    <button
                                        onClick={handleSend}
                                        className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
