import { useEffect, useState, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation } from 'wouter';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import NotFound from '@/pages/not-found';

const wa = (text: string) => `https://wa.me/27761771213?text=${encodeURIComponent(text)}`;
const assets = '/images/';

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [location]);
  return <header className="site-header" style={{position:'absolute',top:0,left:0,right:0,zIndex:30}}>
    <div className="wrap" style={{height:82,display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid rgba(234,221,187,.14)'}}>
      <Link href="/" data-testid="link-brand-home" aria-label="Sandulon home" style={{display:'flex',alignItems:'center',gap:12}}>
        <img src={assets+'logo.png'} alt="" style={{width:24,height:44,objectFit:'contain'}} />
        <span className="display" style={{fontSize:24,letterSpacing:'-.03em'}}>sandulon</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation" style={{display:'flex',alignItems:'center',gap:34}}>
        <Link href="/" className={`nav-link ${location==='/'?'active':''}`} data-testid="link-nav-home">Studio</Link>
        <Link href="/design" className={`nav-link ${location==='/design'?'active':''}`} data-testid="link-nav-design">Design</Link>
        <Link href="/print" className={`nav-link ${location==='/print'?'active':''}`} data-testid="link-nav-print">Print & merchandise</Link>
        <a href={wa('Hello Sandulon, I would like to discuss a project.')} target="_blank" rel="noreferrer" className="solid-link" data-testid="link-nav-contact" style={{padding:'12px 16px'}}>Start a project <ArrowUpRight size={14}/></a>
      </nav>
      <button type="button" onClick={()=>setOpen(!open)} aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} data-testid="button-mobile-menu" className="mobile-toggle" style={{display:'none',border:0,background:'none',color:'#EADDBB',padding:8,cursor:'pointer'}}>
        {open?<X size={22}/>:<Menu size={22}/>}
      </button>
    </div>
    {open&&<nav className="mobile-menu" aria-label="Mobile navigation" style={{position:'absolute',top:82,left:0,right:0,padding:'24px 22px 30px',background:'#130F0E',borderBottom:'1px solid rgba(234,221,187,.2)',display:'grid',gap:22}}>
      <Link href="/" className="nav-link" data-testid="link-mobile-home">Studio</Link>
      <Link href="/design" className="nav-link" data-testid="link-mobile-design">Design consultancy</Link>
      <Link href="/print" className="nav-link" data-testid="link-mobile-print">Print & merchandise</Link>
      <a href={wa('Hello Sandulon, I would like to discuss a project.')} target="_blank" rel="noreferrer" className="solid-link" data-testid="link-mobile-contact">Start a project <ArrowUpRight size={14}/></a>
    </nav>}
  </header>;
}

function Footer() {
  return <footer style={{borderTop:'1px solid rgba(234,221,187,.18)',padding:'34px 0 28px',marginTop:90}}>
    <div className="wrap" style={{display:'flex',justifyContent:'space-between',gap:24,alignItems:'center',flexWrap:'wrap'}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}><img src={assets+'logo.png'} alt="" style={{width:20,height:36,objectFit:'contain'}}/><span className="display" style={{fontSize:20}}>sandulon</span></div>
      <span style={{fontSize:11,color:'#697071'}}>© 2026 Sandulon Design Consultancy Pty. Ltd. · Centurion, Gauteng, South Africa</span>
      <a className="outline-link" href={wa('Hello Sandulon, I would like to discuss a project.')} target="_blank" rel="noreferrer" data-testid="link-footer-whatsapp">Talk to the studio <ArrowUpRight size={14}/></a>
    </div>
  </footer>;
}

function PageShell({children}: {children: ReactNode}) {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.scroll-reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(node => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return <><Header/><main>{children}</main><Footer/></>;
}

function Home() {
  useEffect(()=>{document.title='Sandulon — Independent Design & Print Studio | Centurion'; const d=document.querySelector('meta[name="description"]')||document.createElement('meta');d.setAttribute('name','description');d.setAttribute('content','Sandulon is an independent design and print studio in Centurion, South Africa. UX, industrial design, motion, film, 3D and print.');document.head.appendChild(d);},[]);
  return <PageShell>
    <section style={{minHeight:'min(900px,100svh)',position:'relative',display:'flex',alignItems:'center',paddingTop:90,overflow:'hidden'}}>
      <div style={{position:'absolute',inset:'0 0 0 43%',opacity:.52}} className="hero-image"><img src={assets+'hypercar-render.png'} alt="Hypercar concept designed and rendered at Sandulon" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',maskImage:'linear-gradient(90deg,transparent 0%,black 42%)'}}/></div>
      <div className="wrap" style={{position:'relative',zIndex:1}}>
        <div className="eyebrow reveal" style={{marginBottom:26}}>Centurion, South Africa <span style={{color:'#697071',margin:'0 10px'}}>—</span> Independent design & print studio</div>
        <h1 className="display hero-title reveal reveal-delay" style={{fontSize:'clamp(64px,9.7vw,142px)',lineHeight:.92,maxWidth:830,margin:'0 0 30px'}}>Designed and<br/>made, <i style={{color:'#C7994D',fontWeight:400}}>from brief</i><br/>to product.</h1>
        <p className="reveal" style={{fontSize:16,lineHeight:1.75,color:'rgba(234,221,187,.76)',maxWidth:475,margin:'0 0 34px'}}>Sandulon is the creative centre of Centurion — spanning UX, motion, industrial design, film, and print. Built for work that demands more than the ordinary.</p>
        <div className="reveal" style={{display:'flex',alignItems:'center',gap:27,flexWrap:'wrap'}}>
          <a href={wa('Hello Sandulon, I would like to start a project.')} target="_blank" rel="noreferrer" className="solid-link" data-testid="link-hero-start">Start a project <ArrowUpRight size={15}/></a>
          <a href="#work" className="outline-link" data-testid="link-hero-work">Explore selected work <ArrowDown size={14}/></a>
        </div>
        <div className="mono" style={{position:'absolute',right:0,bottom:-150,color:'rgba(234,221,187,.42)',fontSize:9,writingMode:'vertical-rl'}}>Ancient name. Future studio.</div>
      </div>
      <div style={{position:'absolute',bottom:0,left:0,right:0,borderTop:'1px solid rgba(234,221,187,.16)'}}>
        <div className="wrap" style={{display:'flex',justifyContent:'space-between',padding:'18px 0',gap:20,flexWrap:'wrap'}}><span className="eyebrow">Design with a point of view</span><span style={{fontSize:11,color:'#697071'}}>UX · Industrial · Motion · Film · 3D · Print</span><span className="eyebrow">26° 11′ S / 28° 09′ E</span></div>
      </div>
    </section>
    <section style={{padding:'130px 0 120px',background:'#EADDBB',color:'#130F0E'}}>
      <div className="wrap mobile-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10vw',alignItems:'center'}}>
        <div className="image-frame" style={{height:490,position:'relative'}}><img src={assets+'tote-bag.png'} alt="Sandulon branded tote bag, custom print and merchandise" /><span className="mono" style={{position:'absolute',bottom:18,left:18,fontSize:9,color:'#EADDBB',background:'#130F0E',padding:'9px 12px'}}>Made in the studio · Centurion</span></div>
        <div>
          <div className="eyebrow" style={{color:'#A74926',marginBottom:22}}>About Sandulon</div>
          <h2 className="display" style={{fontSize:'clamp(42px,5.4vw,76px)',lineHeight:1.01,margin:'0 0 28px'}}>Ancient name.<br/>Future studio.</h2>
          <p style={{fontFamily:'Gloock',fontSize:23,lineHeight:1.4,maxWidth:520,margin:'0 0 24px'}}>“The name carries a word older than the studio itself.”</p>
          <p style={{fontSize:15,lineHeight:1.8,color:'#4b4137',maxWidth:550}}>Sandulon is drawn from <i>sendulo</i> — “ancient” in Zulu. It is not a coincidence that a studio built on the future chose a name rooted in what came before. We are a design and print studio based in Centurion, South Africa. Our ambition is singular: to build the kind of studio that puts Africa on the world design map.</p>
          <Link href="/design" className="outline-link" data-testid="link-about-design" style={{color:'#130F0E',marginTop:16}}>A little more about us <ArrowRight size={14}/></Link>
        </div>
      </div>
    </section>
    <section style={{padding:'116px 0 120px'}}>
      <div className="wrap">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',gap:30,marginBottom:48,flexWrap:'wrap'}}>
          <div><div className="eyebrow" style={{marginBottom:18}}>What we do</div><h2 className="display" style={{fontSize:'clamp(42px,6vw,78px)',lineHeight:1,margin:0}}>Two disciplines.<br/><span style={{color:'#C7994D'}}>One studio.</span></h2></div>
          <p style={{maxWidth:340,color:'#9c9484',lineHeight:1.7,fontSize:14,margin:0}}>From the pixels on a screen to the physical thing in your hand — a single creative partner from the first question to the final finish.</p>
        </div>
        <div className="mobile-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',borderTop:'1px solid rgba(234,221,187,.18)'}}>
          <div style={{padding:'30px 32px 34px 0',borderBottom:'1px solid rgba(234,221,187,.18)'}}>
            <span className="eyebrow">01 / Design consultancy</span><h3 className="display" style={{fontSize:38,margin:'20px 0 18px'}}>Ideas, made tangible.</h3>
            <p style={{color:'#a59c8d',fontSize:14,lineHeight:1.8,maxWidth:440}}>UX, industrial design, motion, film, 3D, branding and scriptwriting. We take a good brief and find the form it wants to become.</p>
            <Link href="/design" className="outline-link" data-testid="link-design-services">Explore design services <ArrowRight size={14}/></Link>
          </div>
          <div style={{padding:'30px 0 34px 32px',borderBottom:'1px solid rgba(234,221,187,.18)',borderLeft:'1px solid rgba(234,221,187,.18)'}}>
            <span className="eyebrow">02 / Print & merchandise</span><h3 className="display" style={{fontSize:38,margin:'20px 0 18px'}}>Made to be held.</h3>
            <p style={{color:'#a59c8d',fontSize:14,lineHeight:1.8,maxWidth:440}}>Custom print, branded merchandise and large-format work. Designed and produced in-house — single units welcome.</p>
            <Link href="/print" className="outline-link" data-testid="link-print-services">Explore print & merch <ArrowRight size={14}/></Link>
          </div>
        </div>
      </div>
    </section>
    <section id="work" style={{padding:'110px 0 125px',background:'#1c1715'}}>
      <div className="wrap">
        <div className="eyebrow" style={{marginBottom:18}}>Selected work · 2025—26</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',marginBottom:48,gap:22,flexWrap:'wrap'}}><h2 className="display" style={{fontSize:'clamp(46px,7vw,86px)',lineHeight:.96,margin:0}}>From concept<br/>to finished piece.</h2><a href={wa('Hello Sandulon, I would like to see more selected work.')} target="_blank" rel="noreferrer" className="outline-link" data-testid="link-work-inquiry">More work available on request <ArrowUpRight size={14}/></a></div>
        <div className="mobile-grid" style={{display:'grid',gridTemplateColumns:'1.15fr .85fr',gap:22}}>
          <Project img="deskpad-mockup.png" title="Solid Creations Group" meta="Custom deskpad · Print & merchandise · 2026" tall/>
          <div style={{display:'grid',gap:22}}>
            <Project img="corvette-poster.png" title="The Corvette Stingray" meta="Commercial · Graphic design · 2025"/>
            <Project img="godeza-ux.png" title="Godeza Jewellery" meta="UX design · Digital experience · 2025"/>
          </div>
        </div>
        <div className="mobile-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22,marginTop:22}}>
          <Project img="hypercar-render.png" title="Hypercar concept" meta="Industrial design · 3D · 2025"/>
          <Project img="easyeasel.png" title="EasyEasel" meta="Industrial design · Concept · 2025"/>
          <Project img="ecopen.png" title="EcoPen" meta="Industrial design · 3D · 2025"/>
        </div>
      </div>
    </section>
    <Callout/>
  </PageShell>;
}

function Project({img,title,meta,tall}: {img:string;title:string;meta:string;tall?:boolean}) {
 return <article className="project-card scroll-reveal" data-testid={`card-project-${img.replace('.png','')}`}>
   <div className="image-frame" style={{height:tall?550:260}}><img className="project-img" src={assets+img} alt={`${title} — ${meta}`} /></div>
   <div style={{display:'flex',justifyContent:'space-between',gap:18,paddingTop:13,alignItems:'start'}}><div><h3 className="display" style={{fontSize:22,margin:'0 0 6px'}}>{title}</h3><p style={{fontSize:10,color:'#8d867a',margin:0,letterSpacing:'.07em'}}>{meta}</p></div><ArrowUpRight size={15} color="#C7994D"/></div>
 </article>;
}

function Callout() {
 return <section style={{padding:'110px 0 20px'}}>
   <div className="wrap" style={{borderTop:'1px solid rgba(234,221,187,.2)',paddingTop:50,display:'flex',justifyContent:'space-between',alignItems:'end',gap:30,flexWrap:'wrap'}}>
     <div><div className="eyebrow" style={{marginBottom:20}}>Start a project</div><h2 className="display" style={{fontSize:'clamp(48px,8vw,100px)',lineHeight:.95,margin:0}}>Let’s make<br/><i style={{color:'#C7994D'}}>something.</i></h2><p style={{color:'#a59c8d',fontSize:14,lineHeight:1.7,maxWidth:380,marginTop:24}}>Tell us what you need — design, print, or both. We’ll come back with a quote, usually within 24 hours.</p></div>
     <a className="solid-link" data-testid="link-contact-whatsapp" href={wa('Hello Sandulon, I would like a quote. My project is: ')} target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowUpRight size={15}/></a>
   </div>
 </section>;
}

const disciplines = [
 ['01','UX Design','Interfaces · User flows · Prototyping · Digital products','We design digital experiences that work — clearly, intuitively, and with intent. From app flows to full web interfaces, we map the journey a user takes and remove everything that gets in the way. Deliverables include wireframes, interactive prototypes, and final UI-ready designs.'],
 ['02','Industrial Design','Product concept · ID prototyping · Form language · Material selection','Physical things designed to be made. We take a product from a napkin idea through concept sketching, 3D modelling, and prototype-ready files. Our work accounts for how something feels in the hand, how it ships, and how it holds up — not just how it looks in a render.'],
 ['03','Motion Design','Animation · Motion identity · Explainer video · Transitions','Motion that gives a brand personality. We handle everything from logo animations and brand motion guidelines to full explainer videos and social content. If it needs to move, we make it move with purpose.'],
 ['04','3D Design','3D modelling · Rendering · Visualisation · Concept art','High-fidelity 3D work for product visualisation, concept art, and campaign renders. Whether it is a photorealistic product shot or an abstract spatial concept, we model and light it to the standard your audience expects.'],
 ['05','Film & Commercial','Direction · Scriptwriting · Post-production · Brand films','From script to final cut. We write, direct, and edit commercial content — brand films, product launches, social campaigns, and documentary-style pieces. Every frame is considered. Every word in the script earns its place.'],
 ['06','Branding & DTP','Logo design · Brand identity · Print layout · Style guides','Visual identity built to last. We create logos, brand systems, and full DTP layouts — brochures, pitch decks, signage artwork, and everything in between. Every asset is delivered print-ready and at the correct specifications.']
];
function Design() {
 useEffect(()=>{document.title='Design Consultancy — Sandulon | Centurion'; const d=document.querySelector('meta[name="description"]')||document.createElement('meta');d.setAttribute('name','description');d.setAttribute('content','Six disciplines, one independent design studio. UX, industrial design, motion, 3D, film, branding and DTP in Centurion, South Africa.');document.head.appendChild(d);},[]);
 return <PageShell>
   <section style={{padding:'185px 0 100px',position:'relative',overflow:'hidden'}}>
     <div style={{position:'absolute',right:'-3%',top:'23%',fontSize:'clamp(180px,32vw,480px)',color:'rgba(199,153,77,.07)',lineHeight:.7,fontFamily:'Gloock',pointerEvents:'none'}}>01</div>
     <div className="wrap" style={{position:'relative'}}>
       <Link href="/" className="outline-link" data-testid="link-design-back" style={{border:0,color:'#a59c8d',fontSize:11,marginBottom:60}}>← Back to home</Link>
       <div className="eyebrow" style={{marginBottom:20}}>01 / Design consultancy</div>
       <h1 className="display" style={{fontSize:'clamp(68px,11vw,150px)',lineHeight:.88,maxWidth:1000,margin:'0 0 42px'}}>Where craft<br/>meets <i style={{color:'#C7994D'}}>intention.</i></h1>
       <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,maxWidth:960}}>
         <p style={{fontSize:16,lineHeight:1.8,color:'#c4b9a3',margin:0}}>We work across six disciplines — from the pixels on a screen to the body of a concept car. Every engagement starts with understanding what you actually need, and ends with something built to outlast the brief.</p>
         <div className="eyebrow" style={{alignSelf:'end',color:'#697071'}}>Centurion, South Africa <span style={{color:'#C7994D'}}>—</span> Ideas made tangible</div>
       </div>
     </div>
   </section>
   <section style={{padding:'70px 0 110px',background:'#EADDBB',color:'#130F0E'}}>
    <div className="wrap">
      <div className="eyebrow" style={{color:'#A74926',marginBottom:30}}>What we do / Six disciplines</div>
      {disciplines.map(([n,title,tags,copy])=><article key={n} style={{display:'grid',gridTemplateColumns:'80px minmax(210px,.8fr) 1.2fr',gap:30,padding:'34px 0 38px',borderTop:'1px solid rgba(19,15,14,.2)'}}>
        <span className="mono" style={{fontSize:11,color:'#A74926',paddingTop:7}}>{n}</span>
        <div><h2 className="display" style={{fontSize:'clamp(28px,3.5vw,44px)',lineHeight:1.05,margin:'0 0 14px'}}>{title}</h2><span className="mono" style={{fontSize:9,color:'#766657',lineHeight:1.8}}>{tags}</span></div>
        <p style={{fontSize:14,lineHeight:1.85,color:'#51483e',margin:0,maxWidth:600}}>{copy}</p>
      </article>)}
    </div>
   </section>
   <section style={{padding:'115px 0 95px'}}>
    <div className="wrap">
     <div className="eyebrow" style={{marginBottom:18}}>How we work</div><h2 className="display" style={{fontSize:'clamp(48px,7vw,84px)',margin:'0 0 52px'}}>Clear thinking.<br/><i style={{color:'#C7994D'}}>Good making.</i></h2>
     <div className="mobile-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,borderTop:'1px solid rgba(234,221,187,.2)'}}>
      {[['01','Brief','We start by understanding the problem — not the solution you think you need. A short conversation or written brief is enough to get going.'],['02','Concept','We explore directions and present initial concepts. You choose what resonates. We kill what doesn’t. No attachment to the first idea.'],['03','Refinement','The chosen direction gets pushed further — detail, polish, and iteration until it’s exactly right. You stay in the loop throughout.'],['04','Delivery','Final files, ready to use. Print-ready, screen-ready, or production-ready — formatted correctly for wherever the work is going.']].map(([num,t,c])=><div key={num} style={{padding:'24px 22px 0 0',borderRight:'1px solid rgba(234,221,187,.18)',marginRight:22}}><span className="eyebrow">{num}</span><h3 className="display" style={{fontSize:26,margin:'19px 0 12px'}}>{t}</h3><p style={{fontSize:13,lineHeight:1.8,color:'#a59c8d'}}>{c}</p></div>)}
     </div>
    </div>
   </section>
   <div className="wrap" style={{paddingBottom:30}}><Project img="racecar-sketch.png" title="Hypercar concept development" meta="Industrial design · Concept sketch" /></div>
   <Callout/>
 </PageShell>;
}

const products = [
 {num:'01',name:'Custom Mousepad',spec:'240 × 300mm · Full-colour sublimation print · Rubber base · Stitched edges',price:'R200',sub:'Shipping included · Single unit',features:['Custom design or your own artwork','Design file prep included','5–10 business day turnaround','Delivered via Aramex']},
 {num:'02',name:'Mousepad + Keychain Bundle',spec:'Custom mousepad + matching branded keychain · Coordinated design across both',price:'R270',sub:'Shipping included · Best value',features:['Unified design language across both items','Great for gifts or branded sets','5–10 business day turnaround','Delivered via Aramex']},
 {num:'03',name:'Large Deskpad',spec:'600 × 300mm · Full-colour print · Premium surface · Extended workspace coverage',price:'R450',sub:'Shipping included · Single unit',features:['Large-format custom design','Ideal for branded workspaces','5–10 business day turnaround','Delivered nationwide']}
];
function Print() {
 useEffect(()=>{document.title='Print & Merchandise — Sandulon | Custom Print Centurion'; const d=document.querySelector('meta[name="description"]')||document.createElement('meta');d.setAttribute('name','description');d.setAttribute('content','Custom print. No minimums. Sandulon creates and produces branded merchandise, deskpads, mousepads and print in Centurion, South Africa.');document.head.appendChild(d);},[]);
 return <PageShell>
  <section style={{padding:'180px 0 90px',position:'relative'}}>
   <div className="wrap mobile-grid" style={{display:'grid',gridTemplateColumns:'1fr .8fr',gap:50,alignItems:'center'}}>
    <div><Link href="/" className="outline-link" data-testid="link-print-back" style={{border:0,color:'#a59c8d',fontSize:11,marginBottom:52}}>← Back to home</Link>
    <div className="eyebrow" style={{margin:'12px 0 18px'}}>02 / Print & merchandise</div>
    <h1 className="display" style={{fontSize:'clamp(64px,10vw,132px)',lineHeight:.88,margin:'0 0 26px'}}>Custom print.<br/><i style={{color:'#C7994D'}}>Done right.</i></h1>
    <p style={{fontSize:16,lineHeight:1.8,color:'#c4b9a3',maxWidth:540}}>We design and produce every order in-house. Single units or batch runs — both get the same attention. No templates, no minimums, no middlemen. Just well-made print work, delivered.</p></div>
    <div className="image-frame" style={{height:450}}><img src={assets+'tote-bag.png'} alt="Custom Sandulon printed tote bag merchandise" /></div>
   </div>
  </section>
  <section style={{background:'#1c1715',padding:'75px 0 85px'}}>
   <div className="wrap">
    <div className="eyebrow" style={{marginBottom:32}}>How it works / Simple by design</div>
    <div className="mobile-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:28}}>
     {[['01','Send a brief','Tell us what you need — product, quantity, size, and any artwork you have. WhatsApp or the inquiry form both work. We’ll come back within 24 hours.'],['02','We design it','No artwork? No problem. We create a custom design from your brief. You review and approve before anything goes to print.'],['03','Payment upfront','All print orders are paid upfront before production begins. We’ll send a quote and payment details once the design is approved.'],['04','Delivered to you','We ship via Aramex nationwide, or deliver locally across Centurion. Standard turnaround is 5–10 business days from payment.']].map(([num,title,copy])=><div key={num} style={{borderTop:'1px solid rgba(234,221,187,.28)',paddingTop:18}}><span className="eyebrow">{num}</span><h3 className="display" style={{fontSize:25,margin:'16px 0 10px'}}>{title}</h3><p style={{fontSize:13,color:'#a59c8d',lineHeight:1.75}}>{copy}</p></div>)}
    </div>
   </div>
  </section>
  <section style={{padding:'110px 0 90px'}}>
   <div className="wrap">
    <div className="eyebrow" style={{marginBottom:17}}>Priced products</div><h2 className="display" style={{fontSize:'clamp(44px,7vw,80px)',lineHeight:1,margin:'0 0 42px'}}>No minimum order.</h2>
    <div style={{borderTop:'1px solid rgba(234,221,187,.2)'}}>
     {products.map(p=><article key={p.num} style={{display:'grid',gridTemplateColumns:'58px 1fr 200px',gap:28,padding:'32px 0',borderBottom:'1px solid rgba(234,221,187,.2)'}}>
      <span className="eyebrow" style={{paddingTop:5}}>{p.num}</span>
      <div><h3 className="display" style={{fontSize:30,margin:'0 0 8px'}}>{p.name}</h3><p style={{fontSize:12,color:'#a59c8d',margin:'0 0 18px'}}>{p.spec}</p><div className="mobile-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px 20px'}}>{p.features.map((f,i)=><span key={f} style={{fontSize:11,color:'#c6bda9'}}><span style={{color:'#C7994D',marginRight:9}}>—</span>{f}</span>)}</div></div>
      <div style={{textAlign:'right'}}><span className="display" style={{fontSize:34,color:'#C7994D'}}>{p.price}</span><div style={{fontSize:10,color:'#8d867a',margin:'4px 0 18px'}}>{p.sub}</div><a className="outline-link" href={wa(`Hello Sandulon, I would like to order the ${p.name}.`)} target="_blank" rel="noreferrer" data-testid={`link-order-${p.num}`}>Order now <ArrowUpRight size={13}/></a></div>
     </article>)}
    </div>
   </div>
  </section>
  <section style={{padding:'58px 0 86px',background:'#EADDBB',color:'#130F0E'}}>
   <div className="wrap mobile-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:70,alignItems:'center'}}>
    <div className="image-frame" style={{height:380}}><img src={assets+'deskpad-mockup.png'} alt="Solid Creations Group custom full-colour deskpad" /></div>
    <div><div className="eyebrow" style={{color:'#A74926',marginBottom:17}}>Custom jobs / Client work · 2026</div><h2 className="display" style={{fontSize:48,margin:'0 0 14px'}}>Solid Creations Group</h2><p style={{fontSize:14,lineHeight:1.7,color:'#51483e',maxWidth:440}}>Custom deskpad · large format · full-colour · delivered. Correx boards, flyers, and business cards — every piece made to carry the brand further.</p><a href={wa('Hello Sandulon, I would like a custom print quote for my project.')} target="_blank" rel="noreferrer" className="outline-link" data-testid="link-print-custom-quote" style={{color:'#130F0E',marginTop:10}}>Request a custom quote <ArrowRight size={14}/></a></div>
   </div>
  </section>
  <section style={{padding:'100px 0 30px'}}><div className="wrap">
   <div className="eyebrow" style={{marginBottom:16}}>Priced by the job</div><h2 className="display" style={{fontSize:'clamp(42px,6vw,70px)',margin:'0 0 38px'}}>The details matter.</h2>
   <div className="mobile-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:30}}>
    {[['Correx Boards','Outdoor signage, estate agent boards, A-frames, and property listings. Printed on corrugated plastic, built for outdoor use.','Min. 5 units · Quote on request'],['Flyers','A5 full-colour flyers for events, listings, menus, and promotions. Double or single-sided, gloss or matte. We design and print.','Min. 100 units · Quote on request'],['Business Cards','Single or double-sided, standard or custom size. Ideal for estate agents, freelancers, and small businesses. Design included.','Min. 50 units · Quote on request']].map(([name,body,foot])=><article key={name} style={{borderTop:'1px solid rgba(234,221,187,.24)',paddingTop:18}}><h3 className="display" style={{fontSize:29,margin:'0 0 12px'}}>{name}</h3><p style={{fontSize:13,color:'#a59c8d',lineHeight:1.8,minHeight:86}}>{body}</p><span className="eyebrow" style={{fontSize:9}}>{foot}</span></article>)}
   </div>
  </div></section>
  <Callout/>
 </PageShell>;
}

function Router() {
 return <Switch><Route path="/" component={Home}/><Route path="/design" component={Design}/><Route path="/print" component={Print}/><Route component={NotFound}/></Switch>;
}
function App() {
 const [location] = useLocation();
 return <div key={location}><Router/></div>;
}
export default App;
