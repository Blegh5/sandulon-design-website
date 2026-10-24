import { useEffect, useState, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation } from 'wouter';
import { ArrowDown, ArrowRight, ArrowUpRight, Minus, Plus, Menu, Printer, X } from 'lucide-react';
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
    <section className="home-hero">
      <div className="wrap home-hero-content">
        <div className="eyebrow reveal" style={{marginBottom:26}}>Centurion, South Africa <span style={{color:'#697071',margin:'0 10px'}}>—</span> Independent design & print studio</div>
        <h1 className="display hero-title reveal reveal-delay" style={{lineHeight:.98,margin:'0 0 30px'}}>Designed and<br/>made, <i style={{color:'#C7994D',fontWeight:400}}>from brief</i><br/>to product.</h1>
        <p className="reveal" style={{fontSize:16,lineHeight:1.75,color:'rgba(234,221,187,.76)',maxWidth:475,margin:'0 0 34px'}}>Sandulon is the creative centre of Centurion — spanning UX, motion, industrial design, film, and print. Built for work that demands more than the ordinary.</p>
        <div className="reveal" style={{display:'flex',alignItems:'center',gap:27,flexWrap:'wrap'}}>
          <a href={wa('Hello Sandulon, I would like to start a project.')} target="_blank" rel="noreferrer" className="solid-link" data-testid="link-hero-start">Start a project <ArrowUpRight size={15}/></a>
          <a href="#work" className="outline-link" data-testid="link-hero-work">Explore selected work <ArrowDown size={14}/></a>
        </div>
      </div>
      <div className="home-hero-meta">
        <div className="wrap"><span className="eyebrow">Design with a point of view</span><span className="home-hero-disciplines">UX · Industrial · Motion · Film · 3D · Print</span><span className="eyebrow">26° 11′ S / 28° 09′ E</span></div>
      </div>
    </section>
    <section style={{padding:'130px 0 120px',background:'#EADDBB',color:'#130F0E'}}>
      <div className="wrap mobile-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10vw',alignItems:'center'}}>
        <div className="image-frame home-about-image" style={{height:490,position:'relative'}}><img src={assets+'tote-bag.png'} alt="Sandulon branded tote bag, custom print and merchandise" /><span className="mono" style={{position:'absolute',bottom:18,left:18,fontSize:9,color:'#EADDBB',background:'#130F0E',padding:'9px 12px'}}>Made in the studio · Centurion</span></div>
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
            <p style={{color:'#a59c8d',fontSize:14,lineHeight:1.8,maxWidth:440}}>Apparel, desk gear and large-format print. Browse the 2026 price list or request a quote for a custom job.</p>
            <Link href="/print" className="outline-link" data-testid="link-print-services">Explore 2026 print prices <ArrowRight size={14}/></Link>
          </div>
        </div>
      </div>
    </section>
    <section id="work" style={{padding:'110px 0 125px',background:'#1c1715'}}>
      <div className="wrap">
        <div className="eyebrow" style={{marginBottom:18}}>Selected work · 2025—26</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',marginBottom:48,gap:22,flexWrap:'wrap'}}><h2 className="display" style={{fontSize:'clamp(46px,7vw,86px)',lineHeight:.96,margin:0}}>From concept<br/>to finished piece.</h2><a href={wa('Hello Sandulon, I would like to see more selected work.')} target="_blank" rel="noreferrer" className="outline-link" data-testid="link-work-inquiry">More work available on request <ArrowUpRight size={14}/></a></div>
        <div className="home-work-feature-grid mobile-grid" style={{display:'grid',gridTemplateColumns:'1.15fr .85fr',gap:22}}>
          <Project img="deskpad-mockup.png" title="Solid Creations Group" meta="Custom deskpad · Print & merchandise · 2026" tall/>
          <div style={{display:'grid',gap:22}}>
            <Project img="corvette-poster.png" title="The Corvette Stingray" meta="Commercial · Graphic design · 2025"/>
            <Project img="godeza-ux.png" title="Godeza Jewellery" meta="UX design · Digital experience · 2025"/>
          </div>
        </div>
        <div className="home-work-gallery-grid mobile-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22,marginTop:22}}>
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
        <h1 className="display design-title" style={{fontSize:'clamp(68px,11vw,150px)',lineHeight:.88,maxWidth:1000,margin:'0 0 42px'}}>Where craft<br/>meets <i style={{color:'#C7994D'}}>intention.</i></h1>
        <div className="design-intro-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,maxWidth:960}}>
         <p style={{fontSize:16,lineHeight:1.8,color:'#c4b9a3',margin:0}}>We work across six disciplines — from the pixels on a screen to the body of a concept car. Every engagement starts with understanding what you actually need, and ends with something built to outlast the brief.</p>
         <div className="eyebrow" style={{alignSelf:'end',color:'#697071'}}>Centurion, South Africa <span style={{color:'#C7994D'}}>—</span> Ideas made tangible</div>
       </div>
     </div>
   </section>
   <section style={{padding:'70px 0 110px',background:'#EADDBB',color:'#130F0E'}}>
    <div className="wrap">
      <div className="eyebrow" style={{color:'#A74926',marginBottom:30}}>What we do / Six disciplines</div>
      {disciplines.map(([n,title,tags,copy])=><article className="discipline-row" key={n} style={{display:'grid',gridTemplateColumns:'80px minmax(210px,.8fr) 1.2fr',gap:30,padding:'34px 0 38px',borderTop:'1px solid rgba(19,15,14,.2)'}}>
        <span className="mono" style={{fontSize:11,color:'#A74926',paddingTop:7}}>{n}</span>
        <div><h2 className="display" style={{fontSize:'clamp(28px,3.5vw,44px)',lineHeight:1.05,margin:'0 0 14px'}}>{title}</h2><span className="mono" style={{fontSize:9,color:'#766657',lineHeight:1.8}}>{tags}</span></div>
        <p style={{fontSize:14,lineHeight:1.85,color:'#51483e',margin:0,maxWidth:600}}>{copy}</p>
      </article>)}
    </div>
   </section>
   <section style={{padding:'115px 0 95px'}}>
    <div className="wrap">
     <div className="eyebrow" style={{marginBottom:18}}>How we work</div><h2 className="display" style={{fontSize:'clamp(48px,7vw,84px)',margin:'0 0 52px'}}>Clear thinking.<br/><i style={{color:'#C7994D'}}>Good making.</i></h2>
     <div className="mobile-grid process-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,borderTop:'1px solid rgba(234,221,187,.2)'}}>
      {[['01','Brief','We start by understanding the problem — not the solution you think you need. A short conversation or written brief is enough to get going.'],['02','Concept','We explore directions and present initial concepts. You choose what resonates. We kill what doesn’t. No attachment to the first idea.'],['03','Refinement','The chosen direction gets pushed further — detail, polish, and iteration until it’s exactly right. You stay in the loop throughout.'],['04','Delivery','Final files, ready to use. Print-ready, screen-ready, or production-ready — formatted correctly for wherever the work is going.']].map(([num,t,c])=><div key={num} style={{padding:'24px 22px 0 0',borderRight:'1px solid rgba(234,221,187,.18)',marginRight:22}}><span className="eyebrow">{num}</span><h3 className="display" style={{fontSize:26,margin:'19px 0 12px'}}>{t}</h3><p style={{fontSize:13,lineHeight:1.8,color:'#a59c8d'}}>{c}</p></div>)}
     </div>
    </div>
   </section>
   <div className="wrap" style={{paddingBottom:30}}><Project img="racecar-sketch.png" title="Hypercar concept development" meta="Industrial design · Concept sketch" /></div>
   <Callout/>
 </PageShell>;
}

const apparelProducts = [
  {id:'alpha-t-shirt-men',name:'Alpha T-Shirt Men',price:null},
  {id:'alpha-t-shirt-women',name:'Alpha T-Shirt Women',price:null},
  {id:'classic-pique-polo',name:'175g Classic Pique Knit Polo',price:null},
  {id:'hooded-sweater',name:'Hooded Sweater',price:'R300'},
  {id:'zipped-hooded-sweater',name:'Zipped Hooded Sweater',price:'R460'},
];
const hardGoodsProducts = [
  {id:'small-mousepad',name:'Small Mousepad',spec:'20 × 24 cm',price:'R145'},
  {id:'five-panel-cap',name:'5-Panel Cap',spec:'',price:'R168'},
  {id:'large-deskpad',name:'Large Deskpad',spec:'30 × 70 cm',price:'R190'},
  {id:'correx-board',name:'Correx Board',spec:'600 × 900 mm',price:'R245'},
  {id:'business-cards',name:'Business Cards',spec:'100 units · 85 × 55 mm',price:'R255'},
  {id:'vinyl-stickers',name:'Vinyl Stickers',spec:'1 × 3 m sheet',price:'R170'},
];

type CatalogueProduct = {
  id: string;
  name: string;
  price: string | null;
  spec?: string;
};

const allCatalogueProducts: CatalogueProduct[] = [...apparelProducts, ...hardGoodsProducts];

const customerOrderTerms = [
  {
    id: 'design-fee',
    label: '01 / Artwork',
    title: 'Standard design fee · R50',
    description: 'Covers asset intake, print-ready vector preparation and one revision cycle.',
  },
  {
    id: 'vector-recreation',
    label: '02 / Complex artwork',
    title: 'Manual re-vectoring · R250 excl. VAT',
    description: 'Complex manual re-vectoring or logo recreation beyond standard layout adjustment costs R250 excl. VAT.',
  },
  {
    id: 'payment-terms',
    label: '03 / Payment',
    title: '100% upfront',
    description: 'Full payment is required before production begins.',
  },
  {
    id: 'production-timing',
    label: '04 / Timing',
    title: '10–15 business days in production',
    description: 'Standard production takes 10–15 business days after final proof approval, plus 24–48 hours transit.',
  },
  {
    id: 'courier-delivery',
    label: '05 / Standard delivery',
    title: 'R45 standard overnight',
    description: 'Standard overnight door-to-door delivery is R45.',
  },
  {
    id: 'free-delivery',
    label: '06 / Larger orders',
    title: 'Free delivery over R1,200',
    description: 'Free delivery applies to orders over R1,200; eligibility will be confirmed with your quote.',
  },
  {
    id: 'pudo-delivery',
    label: '07 / Locker delivery',
    title: 'Locker-to-locker · R60 flat',
    description: 'Available on request. A R25-per-order reduction is noted for this option; the final delivery amount will be confirmed with your quote.',
  },
];

const shippingOptions = {
  courier: {
    label: 'Courier Guy standard overnight — R45',
    message: 'Courier Guy standard overnight delivery (R45).',
  },
  pudo: {
    label: 'PUDO locker-to-locker — R60',
    message: 'PUDO locker-to-locker delivery (listed at R60; please confirm the noted R25-per-order reduction and final total).',
  },
  freeDelivery: {
    label: 'Check free delivery eligibility — orders over R1,200',
    message: 'Please check whether this order qualifies for free delivery under the Brands UP policy (orders over R1,200).',
  },
} as const;

type ShippingOption = keyof typeof shippingOptions;

function RequestQuantity({productName, quantity, onChange}: {
  productName: string;
  quantity: number;
  onChange: (quantity: number) => void;
}) {
  if (quantity === 0) {
    return <button
      type="button"
      className="product-action request-add"
      onClick={() => onChange(1)}
      aria-label={`Add ${productName} to request`}
      data-testid={`button-add-${productName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
    >
      Add to request <Plus size={14}/>
    </button>;
  }

  return <div className="request-quantity" aria-label={`Quantity for ${productName}`}>
    <button type="button" onClick={() => onChange(quantity - 1)} aria-label={`Remove one ${productName}`}><Minus size={13}/></button>
    <output aria-live="polite">{quantity}</output>
    <button type="button" onClick={() => onChange(quantity + 1)} aria-label={`Add one ${productName}`}><Plus size={13}/></button>
  </div>;
}

function buildRequestMessage(products: CatalogueProduct[], quantities: Record<string, number>, shipping: ShippingOption) {
  const lines = products
    .filter(product => (quantities[product.id] ?? 0) > 0)
    .map(product => {
      const quantity = quantities[product.id];
      return product.price
        ? `• ${quantity} × ${product.name} (${product.price} each)`
        : `• ${quantity} × ${product.name} — quote required (please confirm size, colour and price)`;
    });
  const includesQuoteOnlyApparel = products.some(product => !product.price && (quantities[product.id] ?? 0) > 0);
  return [
    'Hello Sandulon, I would like to request a quote for:',
    ...lines,
    '',
    `Delivery preference: ${shippingOptions[shipping].message}`,
    ...(includesQuoteOnlyApparel ? ['', 'Please confirm available apparel sizes and colours, along with the quote for those items.'] : []),
    '',
    'Please confirm the final total and any applicable order charges.',
  ].join('\n');
}

function PublicPriceSheet() {
  return <section className="public-price-sheet" aria-labelledby="public-price-sheet-heading" data-testid="section-public-price-sheet">
    <header className="price-sheet-header">
      <div className="price-sheet-brand">SANDULON <span>·</span> PRINT &amp; MERCHANDISE</div>
      <p className="price-sheet-year">CUSTOMER PRICE LIST · 2026</p>
      <h1 id="public-price-sheet-heading" data-testid="text-public-price-sheet-title">Print &amp; merchandise</h1>
      <p className="price-sheet-intro">Published product prices and order terms. All prices are in South African rand (R).</p>
    </header>

    <section className="price-sheet-section" aria-labelledby="price-sheet-apparel-heading">
      <div className="price-sheet-section-heading">
        <h2 id="price-sheet-apparel-heading">Apparel</h2>
        <span>VAT &amp; delivery inclusive</span>
      </div>
      <table className="price-sheet-table">
        <thead><tr><th scope="col">Product</th><th scope="col">Published price</th></tr></thead>
        <tbody>{apparelProducts.map(product => <tr key={product.id} data-testid={`price-sheet-item-${product.id}`}>
          <td>{product.name}</td>
          <td>{product.price || 'Quote on request'}</td>
        </tr>)}</tbody>
      </table>
    </section>

    <section className="price-sheet-section" aria-labelledby="price-sheet-hard-goods-heading">
      <div className="price-sheet-section-heading">
        <h2 id="price-sheet-hard-goods-heading">Desk gear &amp; hard goods</h2>
        <span>Published item prices</span>
      </div>
      <table className="price-sheet-table">
        <thead><tr><th scope="col">Product</th><th scope="col">Published price</th></tr></thead>
        <tbody>{hardGoodsProducts.map(product => <tr key={product.id} data-testid={`price-sheet-item-${product.id}`}>
          <td>{product.name}{product.spec ? <span className="price-sheet-spec"> · {product.spec}</span> : null}</td>
          <td>{product.price}</td>
        </tr>)}</tbody>
      </table>
      <p className="price-sheet-note">Quotes confirm final totals, including any applicable delivery and other order charges.</p>
    </section>

    <section className="price-sheet-section" aria-labelledby="price-sheet-terms-heading">
      <div className="price-sheet-section-heading"><h2 id="price-sheet-terms-heading">Order terms</h2></div>
      <div className="price-sheet-terms">
        {customerOrderTerms.map(term => <article className="price-sheet-term" key={term.id} data-testid={`price-sheet-term-${term.id}`}>
          <h3>{term.title}</h3>
          <p>{term.description}</p>
        </article>)}
      </div>
    </section>

    <p className="price-sheet-footer">2026 customer price list · Contact Sandulon for a quote or to confirm your order total.</p>
  </section>;
}

function Print() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [shipping, setShipping] = useState<ShippingOption>('courier');
  const selectedProducts = allCatalogueProducts.filter(product => (quantities[product.id] ?? 0) > 0);
  const selectedUnitCount = selectedProducts.reduce((total, product) => total + quantities[product.id], 0);
  const requestMessage = buildRequestMessage(selectedProducts, quantities, shipping);

  const updateQuantity = (productId: string, quantity: number) => {
    setQuantities(current => {
      const next = {...current};
      if (quantity <= 0) delete next[productId];
      else next[productId] = quantity;
      return next;
    });
  };

  useEffect(()=>{document.title='Print & Merchandise — Sandulon | Custom Print Centurion'; const d=document.querySelector('meta[name="description"]')||document.createElement('meta');d.setAttribute('name','description');d.setAttribute('content','Browse Sandulon’s 2026 apparel, desk gear and print prices. Request a quote or order directly on WhatsApp.');document.head.appendChild(d);},[]);
 return <PageShell>
   <div className="print-screen-content">
   <section className="print-hero">
    <div className="wrap print-hero-layout">
     <div className="print-hero-copy">
      <Link href="/" className="outline-link" data-testid="link-print-back" style={{border:0,color:'#a59c8d',fontSize:11,marginBottom:42}}>Back to home <ArrowRight size={13}/></Link>
      <div className="eyebrow" style={{margin:'12px 0 18px'}}>02 / Print & merchandise · 2026 price list</div>
      <h1 className="display print-title">Good ideas,<br/><i style={{color:'#C7994D'}}>made physical.</i></h1>
      <p className="print-intro">Apparel, desk gear and everyday print, produced with care. Browse the published prices below, then message us on WhatsApp to place an order or request a quote.</p>
       <div className="print-hero-actions">
        <a href="#catalogue" className="solid-link" data-testid="link-print-browse">Browse the catalogue <ArrowDown size={14}/></a>
        <button type="button" className="outline-link print-list-trigger" onClick={() => window.print()} data-testid="button-print-price-list">
         Print / save 2026 list <Printer size={15}/>
        </button>
       </div>
     </div>
     <div className="print-hero-art">
      <img src={assets+'tote-bag.png'} alt="Printed Sandulon tote bag, an example of custom merchandise" />
      <span className="mono">Sandulon / Print & objects</span>
     </div>
    </div>
   </section>
   <section id="catalogue" className="print-catalogue">
    <div className="wrap">
     <div className="catalogue-heading">
      <div><div className="eyebrow" style={{marginBottom:15}}>2026 / Published prices</div><h2 className="display">The catalogue.</h2></div>
       <p>Add the items you want, set quantities and choose a delivery preference. We’ll send one complete request on WhatsApp; apparel without a listed price needs a quote.</p>
     </div>
     <section className="catalogue-group" aria-labelledby="apparel-heading" data-testid="section-apparel">
      <div className="catalogue-group-head"><div><span className="eyebrow">01 / Wear</span><h3 className="display" id="apparel-heading">Apparel</h3></div><span className="catalogue-note">VAT & delivery inclusive</span></div>
      <div className="product-list">
       {apparelProducts.map((product,index)=><article className="product-row" key={product.id} data-testid={`card-product-${product.id}`}>
        <span className="product-index mono">{String(index+1).padStart(2,'0')}</span>
        <h4 className="display product-name">{product.name}</h4>
        <span className={`product-price ${product.price?'':'quote-price'}`} data-testid={`text-price-${product.id}`}>{product.price||'Quote on request'}</span>
         <RequestQuantity productName={product.name} quantity={quantities[product.id] ?? 0} onChange={quantity => updateQuantity(product.id, quantity)}/>
       </article>)}
      </div>
     </section>
     <section className="catalogue-group hard-goods" aria-labelledby="hard-goods-heading" data-testid="section-hard-goods">
      <div className="catalogue-group-head"><div><span className="eyebrow">02 / Work & play</span><h3 className="display" id="hard-goods-heading">Desk gear &amp; hard goods</h3></div><span className="catalogue-note">Published item prices</span></div>
      <div className="hard-goods-grid">
       {hardGoodsProducts.map((product,index)=><article className="hard-good-card" key={product.id} data-testid={`card-product-${product.id}`}>
        <div className="hard-good-top"><span className="product-index mono">{String(index+6).padStart(2,'0')}</span><span className="display hard-good-price" data-testid={`text-price-${product.id}`}>{product.price}</span></div>
        <h4 className="display">{product.name}</h4>
        {product.spec&&<p>{product.spec}</p>}
         <RequestQuantity productName={product.name} quantity={quantities[product.id] ?? 0} onChange={quantity => updateQuantity(product.id, quantity)}/>
       </article>)}
      </div>
      <p className="catalogue-footnote">Quotes confirm final totals, including any applicable delivery and other order charges.</p>
     </section>
     <section className="request-panel" aria-labelledby="request-heading" data-testid="section-order-request">
      <div className="request-panel-heading">
       <div><div className="eyebrow" style={{marginBottom:12}}>One message · All your items</div><h3 className="display" id="request-heading">Your request.</h3></div>
       <span className="request-count" aria-live="polite">{selectedProducts.length} {selectedProducts.length === 1 ? 'item' : 'items'} · {selectedUnitCount} {selectedUnitCount === 1 ? 'unit' : 'units'}</span>
      </div>
      {selectedProducts.length === 0
       ? <p className="request-empty">Add products from the catalogue above to build your request. You can change quantities before sending.</p>
       : <ul className="request-items">
         {selectedProducts.map(product=><li className="request-item" key={product.id} data-testid={`request-item-${product.id}`}>
          <div className="request-item-copy">
           <span className="display">{product.name}</span>
           {product.price
             ? <span className="request-item-price">{product.price} each</span>
             : <span className="request-item-quote">Quote required · size, colour and price to confirm</span>}
          </div>
          <RequestQuantity productName={product.name} quantity={quantities[product.id] ?? 0} onChange={quantity => updateQuantity(product.id, quantity)}/>
         </li>)}
        </ul>}
      <div className="request-panel-footer">
       <label className="shipping-field" htmlFor="shipping-preference">
        <span className="eyebrow">Delivery preference</span>
        <select id="shipping-preference" value={shipping} onChange={event => setShipping(event.target.value as ShippingOption)} data-testid="select-shipping-preference">
         {Object.entries(shippingOptions).map(([value, option])=><option key={value} value={value}>{option.label}</option>)}
        </select>
        {shipping === 'pudo' && <span className="shipping-hint">The price list notes a R25-per-order reduction for PUDO; the final delivery amount will be confirmed.</span>}
        {shipping === 'freeDelivery' && <span className="shipping-hint">Free delivery is listed for orders over R1,200; eligibility will be confirmed with your quote.</span>}
       </label>
       {selectedProducts.length > 0
         ? <a className="solid-link request-send" href={wa(requestMessage)} target="_blank" rel="noreferrer" data-testid="link-send-order-request">Send complete request on WhatsApp <ArrowUpRight size={15}/></a>
         : <button className="solid-link request-send" type="button" disabled>Select products to continue</button>}
      </div>
     </section>
    </div>
   </section>
   <section className="order-details" aria-labelledby="order-details-heading" data-testid="section-order-details">
    <div className="wrap order-details-layout">
     <div className="order-details-intro"><div className="eyebrow" style={{marginBottom:16}}>Before we make it</div><h2 className="display" id="order-details-heading">Clear terms.<br/><i style={{color:'#C7994D'}}>Good work.</i></h2><p>From artwork preparation to delivery, here is what to expect with your order.</p></div>
     <div className="terms-list">
       {customerOrderTerms.map(term => <article className="term-item" key={term.id} data-testid={`text-${term.id}`}>
        <span className="eyebrow">{term.label}</span><div><h3>{term.title}</h3><p>{term.description}</p></div>
       </article>)}
     </div>
    </div>
   </section>
   <section className="print-contact">
    <div className="wrap print-contact-inner"><div><div className="eyebrow" style={{marginBottom:14}}>Ready when you are</div><h2 className="display">Have a brief?<br/><i style={{color:'#C7994D'}}>Let’s talk.</i></h2><p>Send the item, quantity and any artwork you have. We’ll confirm your order details and final total.</p></div><a href={wa('Hello Sandulon, I would like a quote for a print or merchandise order.')} target="_blank" rel="noreferrer" className="solid-link" data-testid="link-print-whatsapp">Start on WhatsApp <ArrowUpRight size={15}/></a></div>
   </section>
  <Callout/>
   </div>
   <PublicPriceSheet/>
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
