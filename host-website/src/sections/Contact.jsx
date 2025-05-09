import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name:'',
        email:'',
        message:''
    });

    const handleChange = ({ target: { name, value } }) => {
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        //service id: service_tw7m09d
        //template id: template_8ak8v3o
        e.preventDefault();
        setLoading(true);
        try {
            await emailjs.send('service_tw7m09d', 'template_8ak8v3o', 
                {
                    from_name: form.name, 
                    to_name: 'Domi', 
                    from_email: form.email, 
                    to_email: 'domie488@gmail.com', 
                    message: form.message
                }, 'ne_voS8o3-I9y_xuM');
            alert('Message sent successfully');
            setLoading(false);
            setForm({
                name:'',
                email:'',
                message:''
            })
        } catch (error) {
            setLoading(false);
            console.log(error);
            alert('Something went wrong, please try again');
        }
    }

    return(
        <section className="sm:px-10 px-5 my-20" id="contact">
            <div className="relative min-h-screen flex items-center justify-center flex-col">
                <img src="/assets/terminal.png" alt="terminal" className="absolute inset-0 min-h-screen"/>
                <div className="max-w-xl relative z-10 sm:px-10 px-5 mt-12">
                    <h3 className="sm:text-4xl text-3xl font-semibold text-white">Let's talk</h3>
                    <p className="text-lg text-white mt-3">
                        Type your message
                    </p>
                    <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
                        <label className="space-y-3">
                            <span className="text-lg text-white">Full name</span>
                            <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full bg-black-300 px-5 py-2 min-h-14 rounded-lg placeholder:text-white-500 text-lg text-white shadow-black-200 shadow-2xl focus:outline-none" placeholder="John Doe"/>
                        </label>
                        <label className="space-y-3">
                            <span className="text-lg text-white">Email</span>
                            <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full bg-black-300 px-5 py-2 min-h-14 rounded-lg placeholder:text-white-500 text-lg text-white shadow-black-200 shadow-2xl focus:outline-none" placeholder="johndoe@gmail.com"/>
                        </label>
                        <label className="space-y-3">
                            <span className="text-lg text-white">Message</span>
                            <textarea type="text" name="message" value={form.message} onChange={handleChange} required rows={5} className="w-full bg-black-300 px-5 py-2 min-h-14 rounded-lg placeholder:text-white-500 text-lg text-white shadow-black-200 shadow-2xl focus:outline-none" placeholder="My message...."/>
                        </label>
                        <button className="bg-black-500 px-5 py-2 min-h-12 rounded-lg shadow-black-200 shadow-2xl flex justify-center items-center text-lg text-white gap-3" type="submit" disabled={loading}>{loading ? 'Sending..' : 'Send message'}
                            <img src="/assets/arrow-up.png" alt="arrow-up" className="w-2.5 h-2.5 object-contain invert brightness-0"/>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact;
