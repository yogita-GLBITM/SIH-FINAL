import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {HERO_SLIDES} from '../../data/states';
import Logo from '../common/Logo';
import './login.css';

export default function LoginPage({onLogin}){
  const nav=useNavigate(); const [slide,setSlide]=useState(0); const [show,setShow]=useState(false);
  const [form,setForm]=useState({name:'',phone:'',email:'',dob:'',address:'',familyName:'',familyPhone:''});
  useEffect(()=>{const t=setInterval(()=>setSlide(s=>(s+1)%HERO_SLIDES.length),4200);return()=>clearInterval(t)},[]);
  const s=HERO_SLIDES[slide];
  const submit=e=>{e.preventDefault(); if(!form.name||!form.phone)return; onLogin(form);nav('/explore')};
  return <main className="login-page" style={{'--slide-accent':s.accent}}>
    <div className="login-atmosphere" style={{backgroundImage:`url(${s.img})`}} />
    <div className="login-vignette"/>
    <header className="landing-brand"><Logo size={40}/><b>AVYSURE</b><small>NORTHEAST INDIA • ONE JOURNEY</small></header>
    <div className="slide-copy"><span className="tiny-kicker" style={{color:s.accent}}>DISCOVER THE NORTHEAST</span><h1>{s.state}</h1><p>{s.tag}</p><div className="slide-dots">{HERO_SLIDES.map((x,i)=><button key={x.state} onClick={()=>setSlide(i)} className={i===slide?'on':''} style={i===slide?{background:x.accent,width:62}:undefined} aria-label={x.state}/>)}</div></div>
    <section className="login-card glass-login">
      <div className="login-card-top"><span>YOUR TRAVEL PASSPORT</span><span>{String(slide+1).padStart(2,'0')} / {String(HERO_SLIDES.length).padStart(2,'0')}</span></div>
      <h2>Begin the <i>journey.</i></h2><p>Plan deeper. Travel smarter. Find stories beyond the usual route.</p>
      <form onSubmit={submit}>
        <div className="field-row"><label>Full name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name" required/></label><label>Phone<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91 …" required/></label></div>
        <label>Email<input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com" type="email"/></label>
        <div className="field-row"><label>Date of birth<input value={form.dob} onChange={e=>setForm({...form,dob:e.target.value})} type="date"/></label><label>Home address<input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="City / address"/></label></div>
        <button type="button" className="family-toggle" onClick={()=>setShow(!show)}>{show?'−':'+'} Add family / emergency contact</button>
        {show&&<div className="field-row family-fields"><label>Family member<input value={form.familyName} onChange={e=>setForm({...form,familyName:e.target.value})} placeholder="Name"/></label><label>Contact number<input value={form.familyPhone} onChange={e=>setForm({...form,familyPhone:e.target.value})} placeholder="Phone"/></label></div>}
        <button className="enter-btn" type="submit"><span>ENTER AVYSURE</span><b>↗</b></button>
      </form>
      <small className="login-note">Frontend demo • details stay in this session for the prototype</small>
    </section>
    <div className="scroll-hint">SCROLL TO EXPLORE <span>↓</span></div>
  </main>
}
