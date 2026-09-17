import { useState } from 'react'
import './index.css'

const matches = [
  {name:'Aarav', age:22, route:'Patna → Delhi', time:'Tomorrow · 7:30 AM', score:94, verified:true, rating:'4.9'},
  {name:'Ananya', age:21, route:'Patna → Delhi', time:'Tomorrow · 8:00 AM', score:89, verified:true, rating:'4.8'},
  {name:'Rohan', age:24, route:'Patna → Noida', time:'Friday · 6:45 AM', score:82, verified:false, rating:'4.7'},
]

function Avatar({letter='M',large=false}) {
  return <div className={`avatar ${large?'large':''}`}>{letter}</div>
}

function Header({title,back=true,onBack,action=''}) {
  return <header className="pageHeader">
    <button className="headerBtn" onClick={onBack}>{back?'‹':'TAG'}</button>
    <h1>{title}</h1>
    <button className="headerBtn">{action}</button>
  </header>
}

function Nav({screen,go}) {
  return <nav className="bottomNav">
    <button className={screen==='home'?'selected':''} onClick={()=>go('home')}><span>⌂</span><small>Home</small></button>
    <button className={screen==='discover'?'selected':''} onClick={()=>go('discover')}><span>⌕</span><small>Discover</small></button>
    <button className="createNav" onClick={()=>go('create')}>+</button>
    <button className={screen==='tags'?'selected':''} onClick={()=>go('tags')}><span>◇</span><small>Tags</small></button>
    <button className={screen==='profile'?'selected':''} onClick={()=>go('profile')}><span>○</span><small>Profile</small></button>
  </nav>
}

function Empty({icon='◇',title,text,action,onAction}) {
  return <section className="empty">
    <div className="emptyIcon">{icon}</div>
    <h2>{title}</h2>
    <p>{text}</p>
    {action&&<button className="primary" onClick={onAction}>{action} →</button>}
  </section>
}

function App() {
  const [screen,setScreen] = useState('home')
  const [message,setMessage] = useState('')
  const [messages,setMessages] = useState([
    {mine:false,text:'Hey! Ready for tomorrow?'},
    {mine:true,text:"Yep 👋 I'll reach the pickup point by 7:15."},
    {mine:false,text:"Perfect. Let's keep everything here."},
  ])
  const [profile,setProfile] = useState({name:'Mohnish Raj',phone:'•••••• 4821'})
  const [tag,setTag] = useState({from:'Patna',to:'Delhi',date:'Tomorrow',time:'7:30 AM',mode:'Need a ride'})
  const [requestSent,setRequestSent] = useState(false)
  const [completed,setCompleted] = useState(false)

  const go = s => {
    setScreen(s)
    window.scrollTo({top:0,behavior:'smooth'})
  }

  const send = () => {
    if(!message.trim()) return
    setMessages([...messages,{mine:true,text:message.trim()}])
    setMessage('')
  }

  const sendRequest = () => {
    setRequestSent(true)
    go('request')
  }

  const finish = () => {
    setCompleted(true)
    go('review')
  }

  const navScreens=['home','discover','tags','profile']

  return <main className="app"><div className="phone">

    {/* ONBOARDING */}
    {screen==='onboarding' && <section className="onboarding">
      <div className="logoMark">T</div>
      <div className="onboardArt"><span>✦</span><b>→</b><i>✦</i></div>
      <p className="eyebrow">WELCOME TO TAG</p>
      <h1>Don't travel alone.<br/><em>Find your people.</em></h1>
      <p>Discover people going your way, connect with confidence, and keep the journey organised inside Tag.</p>
      <button className="primary" onClick={()=>go('auth')}>Get started →</button>
      <button className="textBtn" onClick={()=>go('auth')}>I already have an account</button>
    </section>}

    {/* AUTH */}
    {screen==='auth' && <section className="auth">
      <Header title="Welcome back" action="" onBack={()=>go('onboarding')}/>
      <div className="authIntro"><h2>Your number, your identity.</h2><p>We'll use it to securely verify your account.</p></div>
      <label className="fieldLabel">Mobile number
        <div className="phoneInput"><span>+91</span><input placeholder="Enter mobile number" inputMode="numeric"/></div>
      </label>
      <button className="primary" onClick={()=>go('otp')}>Continue →</button>
      <p className="legal">By continuing, you agree to Tag's Terms and Privacy Policy.</p>
    </section>}

    {screen==='otp' && <section>
      <Header title="Verify number" onBack={()=>go('auth')}/>
      <div className="centerIntro"><div className="otpIcon">✓</div><h2>Check your phone</h2><p>Enter the 6-digit code we sent you.</p></div>
      <div className="otpBoxes">{[1,2,3,4,5,6].map(x=><input key={x} maxLength="1" inputMode="numeric"/>)}</div>
      <button className="primary" onClick={()=>go('setup')}>Verify →</button>
      <button className="textBtn">Didn't receive it? Resend</button>
    </section>}

    {/* PROFILE SETUP */}
    {screen==='setup' && <section>
      <Header title="Create your profile" onBack={()=>go('otp')}/>
      <div className="setupAvatar"><Avatar letter="M" large/><button>＋</button></div>
      <div className="form">
        <label>Your name<div className="inputWrap"><input value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})}/></div></label>
        <label>Age<div className="inputWrap"><input placeholder="Your age" inputMode="numeric"/></div></label>
        <label>What describes you?<div className="chipGrid"><button className="chip active">Traveller</button><button className="chip">Student</button><button className="chip">Professional</button></div></label>
      </div>
      <button className="primary" onClick={()=>go('home')}>Complete profile →</button>
    </section>}

    {/* HOME */}
    {screen==='home' && <>
      <header className="homeHeader">
        <div><p className="eyebrow">GOOD EVENING</p><h1>Hey, {profile.name.split(' ')[0]} 👋</h1></div>
        <button className="notification" onClick={()=>go('notifications')}>♡<i/></button>
      </header>

      <section className="hero">
        <div className="heroIcon">✦</div>
        <div><strong>Find your people.</strong><p>Make the journey together.</p></div>
      </section>

      <section className="routeCard">
        <div className="routePoint"><span className="routeDot start"/><div><small>FROM</small><strong>{tag.from}</strong></div></div>
        <div className="routeConnector"/>
        <div className="routePoint"><span className="routeDot end"/><div><small>TO</small><strong>{tag.to}</strong></div></div>
        <button className="primary" onClick={()=>go('discover')}>Find my people <span>→</span></button>
      </section>

      <div className="sectionHead"><h2>Quick start</h2><button onClick={()=>go('discover')}>See all</button></div>
      <div className="quickGrid">
        <button className="quickCard" onClick={()=>go('create')}><span className="quickIcon purple">＋</span><strong>Create a Tag</strong><small>Tell people where you're going</small></button>
        <button className="quickCard" onClick={()=>go('discover')}><span className="quickIcon yellow">⌕</span><strong>Discover</strong><small>See matching journeys</small></button>
      </div>

      <div className="sectionHead"><h2>Strong match</h2><button onClick={()=>go('discover')}>View all</button></div>
      <button className="miniMatch" onClick={()=>go('person')}>
        <Avatar letter="A"/><div className="matchInfo"><strong>Aarav · 22</strong><span>Patna → Delhi</span><small>Tomorrow · 7:30 AM</small></div><b>94%</b>
      </button>

      <div className="trustStrip"><span>✓</span><div><strong>Built around trust</strong><small>Verified identity · Protected communication · Reputation</small></div></div>
    </>}

    {/* CREATE */}
    {screen==='create' && <section>
      <Header title="Create Tag" onBack={()=>go('home')}/>
      <div className="stepLabel"><span>01</span><div><b>Tell us about your journey</b><small>We'll find compatible people.</small></div></div>
      <div className="form">
        <label>Starting point<div className="inputWrap"><span>●</span><input value={tag.from} onChange={e=>setTag({...tag,from:e.target.value})}/></div></label>
        <label>Destination<div className="inputWrap"><span>◆</span><input value={tag.to} onChange={e=>setTag({...tag,to:e.target.value})}/></div></label>
        <div className="two"><label>Date<div className="inputWrap"><input value={tag.date} readOnly/></div></label><label>Time<div className="inputWrap"><input value={tag.time} readOnly/></div></label></div>
        <label>Tag type</label>
        <div className="choiceGroup">
          <button className={`choice ${tag.mode==='Need a ride'?'selected':''}`} onClick={()=>setTag({...tag,mode:'Need a ride'})}><b>Need a ride</b><span>I'm looking for someone to travel with.</span>{tag.mode==='Need a ride'&&<i>✓</i>}</button>
          <button className={`choice ${tag.mode==='Offering a ride'?'selected':''}`} onClick={()=>setTag({...tag,mode:'Offering a ride'})}><b>Offering a ride</b><span>I have space and want to travel together.</span>{tag.mode==='Offering a ride'&&<i>✓</i>}</button>
        </div>
      </div>
      <button className="primary" onClick={()=>go('publish')}>Review Tag →</button>
    </section>}

    {screen==='publish' && <section>
      <Header title="Review your Tag" onBack={()=>go('create')}/>
      <div className="reviewTag">
        <span>YOUR TAG</span><h2>{tag.from} → {tag.to}</h2><p>{tag.date} · {tag.time}</p>
        <div className="reviewRows"><div><span>Type</span><b>{tag.mode}</b></div><div><span>Visibility</span><b>Compatible people</b></div><div><span>Identity</span><b>Verified ✓</b></div></div>
      </div>
      <div className="notice">You control what personal information is shared after a match.</div>
      <button className="primary" onClick={()=>go('discover')}>Publish Tag →</button>
    </section>}

    {/* DISCOVER */}
    {screen==='discover' && <section>
      <Header title="Discover" action="⌕" onBack={()=>go('home')}/>
      <div className="filterRow"><button className="filter active">Best match</button><button className="filter">Tomorrow</button><button className="filter">Nearby</button></div>
      <div className="discoverIntro"><div><h2>People going your way</h2><p>3 compatible Tags found</p></div><span>94%</span></div>
      {matches.map(p=><button className="personCard" key={p.name} onClick={()=>go('person')}>
        <div className="personTop"><Avatar letter={p.name[0]} large/><div className="personMain"><strong>{p.name} · {p.age}</strong><span>{p.route}</span><small>{p.time}</small></div><div className="matchScore">{p.score}%<small>match</small></div></div>
        <div className="tagLine">{p.verified&&<span>✓ Verified</span>}<span>Same route</span><span>★ {p.rating}</span></div>
      </button>)}
    </section>}

    {/* PERSON */}
    {screen==='person' && <section>
      <Header title="Aarav" action="•••" onBack={()=>go('discover')}/>
      <section className="profileHero"><div className="profileAvatar">A</div><h2>Aarav, 22</h2><p>Patna · Member since 2026</p><div className="profileBadges"><span>✓ Verified</span><span>★ 4.9</span><span>12 Tags</span></div></section>
      <section className="profileSection"><div className="cardTitle"><h3>Journey</h3><span>Tomorrow</span></div><div className="journey"><div><span className="routeDot start"/><b>Patna</b><small>7:30 AM</small></div><div className="journeyLine"/><div><span className="routeDot end"/><b>Delhi</b><small>~5 hrs</small></div></div></section>
      <section className="profileSection"><div className="cardTitle"><h3>Why you match</h3></div><div className="matchReasons"><div><b>94%</b><span>overall match</span></div><div><b>✓</b><span>verified</span></div><div><b>★</b><span>4.9 rating</span></div></div></section>
      <button className="primary" onClick={sendRequest}>{requestSent?'Request sent':'Send request'} <span>→</span></button>
      <p className="safeText">You decide what information to share.</p>
    </section>}

    {/* REQUEST */}
    {screen==='request' && <section>
      <Header title="Request sent" onBack={()=>go('discover')}/>
      <section className="requestState"><div className="pendingIcon">◷</div><h2>Waiting for Aarav</h2><p>Your request is protected. You'll be notified when they respond.</p></section>
      <div className="requestCard"><div><span>Tag</span><b>{tag.from} → {tag.to}</b></div><div><span>Status</span><strong>Pending</strong></div></div>
      <button className="secondary" onClick={()=>go('discover')}>Continue discovering</button>
    </section>}

    {/* MATCH */}
    {screen==='match' && <section>
      <Header title="Your Match" onBack={()=>go('person')}/>
      <section className="matchSuccess"><div className="successCircle">✓</div><h2>You're connected!</h2><p>Your Tag with <b>Aarav</b> is active.</p></section>
      <section className="protectedCard"><div className="lock">⌾</div><div><strong>Protected communication</strong><p>Coordinate inside Tag without immediately exposing personal contact details.</p></div></section>
      <section className="matchSummary"><div><span>Route</span><b>Patna → Delhi</b></div><div><span>Departure</span><b>Tomorrow · 7:30 AM</b></div></section>
      <button className="primary" onClick={()=>go('chat')}>Open Tag chat →</button>
      <button className="secondary" onClick={()=>go('safety')}>View safety controls</button>
    </section>}

    {/* CHAT */}
    {screen==='chat' && <section>
      <Header title="Aarav" action="•••" onBack={()=>go('match')}/>
      <div className="chatStatus"><span>●</span> Active Tag · Patna → Delhi</div>
      <div className="chat"><div className="date">TODAY</div>{messages.map((m,i)=><div key={i} className={`bubble ${m.mine?'mine':'other'}`}>{m.text}</div>)}</div>
      <div className="chatBottom"><div className="composer"><input value={message} onChange={e=>setMessage(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Message..."/><button onClick={send}>↑</button></div><button className="completeLink" onClick={()=>go('active')}>Open journey controls</button></div>
    </section>}

    {/* ACTIVE */}
    {screen==='active' && <section>
      <Header title="Active Tag" onBack={()=>go('chat')}/>
      <div className="liveCard"><div><span>● LIVE</span><h2>Patna → Delhi</h2><p>Tomorrow · 7:30 AM</p></div><div className="liveRoute">A ───── B</div></div>
      <div className="activeGrid"><button onClick={()=>go('chat')}><b>☷</b><span>Chat</span></button><button onClick={()=>go('share')}><b>↗</b><span>Share status</span></button><button onClick={()=>go('safety')}><b>⌾</b><span>Safety</span></button><button onClick={finish}><b>✓</b><span>Complete</span></button></div>
      <div className="notice">Tag stays useful throughout the journey: coordination, safety, completion and reputation all happen here.</div>
    </section>}

    {/* SHARE */}
    {screen==='share' && <section>
      <Header title="Journey status" onBack={()=>go('active')}/>
      <div className="shareCard"><div className="sharePulse">●</div><h2>You're on an active Tag</h2><p>Share a temporary journey status without exposing your private contact details.</p><button className="primary">Generate temporary status →</button></div>
      <button className="secondary" onClick={()=>go('active')}>Done</button>
    </section>}

    {/* SAFETY */}
    {screen==='safety' && <section>
      <Header title="Safety & privacy" onBack={()=>go('match')}/>
      <div className="settingsGroup">
        <button><span>⌾</span><div><b>Identity verification</b><small>Verified ✓</small></div><i>›</i></button>
        <button><span>◉</span><div><b>Contact visibility</b><small>Protected</small></div><i>›</i></button>
        <button><span>⚑</span><div><b>Report this person</b><small>Tell us what happened</small></div><i>›</i></button>
        <button><span>×</span><div><b>Block person</b><small>Stop all interaction</small></div><i>›</i></button>
      </div>
      <div className="notice">If something feels wrong, you can end the Tag immediately. Your safety comes first.</div>
    </section>}

    {/* COMPLETE */}
    {screen==='complete' && <section>
      <Header title="Complete Tag" onBack={()=>go('active')}/>
      <section className="completion"><div className="completionIcon">✓</div><h2>Journey complete?</h2><p>Confirm the journey so both people can build their Tag reputation.</p><div className="completionCard"><Avatar letter="A"/><div><b>Aarav</b><span>Patna → Delhi</span></div><strong>✓</strong></div></section>
      <button className="primary" onClick={finish}>Complete & review →</button>
      <button className="secondary" onClick={()=>go('active')}>Not yet</button>
    </section>}

    {/* REVIEW */}
    {screen==='review' && <section>
      <Header title="Your experience" back={false}/>
      <section className="review"><div className="reviewAvatar">A</div><h2>How was your Tag with Aarav?</h2><p>Your feedback helps build trust for everyone.</p><div className="stars">{[1,2,3,4,5].map(n=><button key={n}>★</button>)}</div><div className="reviewChips"><button>Friendly</button><button>On time</button><button>Respectful</button><button>Good communication</button></div></section>
      <button className="primary" onClick={()=>go('home')}>Submit review →</button>
    </section>}

    {/* TAGS */}
    {screen==='tags' && <section>
      <Header title="My Tags" action="＋" onBack={()=>go('home')}/>
      <div className="tabs"><button className="active">Active</button><button>Upcoming</button><button>History</button></div>
      {!completed ? <section className="activeTagCard"><div className="activeTagTop"><span>ACTIVE TAG</span><b>● Live</b></div><h2>Patna → Delhi</h2><p>Tomorrow · 7:30 AM</p><div className="tagPeople"><Avatar letter="A"/><div><b>Aarav</b><span>94% match · Verified</span></div><button onClick={()=>go('chat')}>Chat →</button></div></section> : <Empty icon="✓" title="No active Tags" text="Completed journeys will appear in your history." action="Create a Tag" onAction={()=>go('create')}/>}
    </section>}

    {/* NOTIFICATIONS */}
    {screen==='notifications' && <section>
      <Header title="Notifications" onBack={()=>go('home')}/>
      <div className="notificationItem"><span className="notifIcon">✓</span><div><b>Your identity is verified</b><small>Your profile is ready to discover people.</small></div><em>Now</em></div>
      <div className="notificationItem"><span className="notifIcon">✦</span><div><b>Strong match found</b><small>Aarav has a 94% journey match with you.</small></div><em>5m</em></div>
      <div className="notificationItem"><span className="notifIcon">◇</span><div><b>Your Tag is active</b><small>Keep coordination inside Tag.</small></div><em>1h</em></div>
    </section>}

    {/* PROFILE */}
    {screen==='profile' && <section>
      <Header title="Profile" action="⚙" onBack={()=>go('home')}/>
      <section className="settingsProfile"><div className="profileAvatar small">M</div><div><h2>{profile.name}</h2><p>Verified · Member since 2026</p></div><button>›</button></section>
      <div className="profileStats"><div><b>12</b><span>Tags</span></div><div><b>4.9</b><span>Rating</span></div><div><b>100%</b><span>Verified</span></div></div>
      <div className="settingsGroup">
        <button onClick={()=>go('editProfile')}><span>♙</span><div><b>Personal information</b><small>Profile, identity & preferences</small></div><i>›</i></button>
        <button onClick={()=>go('safety')}><span>⌾</span><div><b>Safety & privacy</b><small>Control what you share</small></div><i>›</i></button>
        <button onClick={()=>go('reputation')}><span>★</span><div><b>Reputation</b><small>Your ratings & history</small></div><i>›</i></button>
      </div>
      <div className="settingsGroup">
        <button onClick={()=>go('help')}><span>?</span><div><b>Help & support</b><small>Get help with Tag</small></div><i>›</i></button>
        <button onClick={()=>go('settings')}><span>⚙</span><div><b>Settings</b><small>Preferences & account</small></div><i>›</i></button>
      </div>
    </section>}

    {/* EDIT PROFILE */}
    {screen==='editProfile' && <section>
      <Header title="Personal information" onBack={()=>go('profile')}/>
      <div className="setupAvatar"><div className="profileAvatar">M</div><button>＋</button></div>
      <div className="form"><label>Name<div className="inputWrap"><input value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})}/></div></label><label>Phone<div className="inputWrap"><input value={profile.phone} readOnly/></div></label><label>Bio<div className="inputWrap"><input placeholder="Tell people a little about you"/></div></label></div>
      <button className="primary" onClick={()=>go('profile')}>Save changes →</button>
    </section>}

    {/* REPUTATION */}
    {screen==='reputation' && <section>
      <Header title="Reputation" onBack={()=>go('profile')}/>
      <div className="reputationHero"><strong>4.9</strong><div className="stars smallStars">★★★★★</div><span>Based on 12 completed Tags</span></div>
      <div className="ratingRows"><div><span>Friendly</span><b>11</b></div><div><span>On time</span><b>10</b></div><div><span>Respectful</span><b>12</b></div><div><span>Good communication</span><b>11</b></div></div>
    </section>}

    {/* SETTINGS */}
    {screen==='settings' && <section>
      <Header title="Settings" onBack={()=>go('profile')}/>
      <div className="settingsGroup">
        <button><span>◉</span><div><b>Notifications</b><small>Journey & match alerts</small></div><i>›</i></button>
        <button><span>⌁</span><div><b>Language</b><small>English</small></div><i>›</i></button>
        <button><span>⌾</span><div><b>Privacy</b><small>Manage data & visibility</small></div><i>›</i></button>
      </div>
      <div className="settingsGroup">
        <button><span>?</span><div><b>Help & support</b><small>Get assistance</small></div><i>›</i></button>
        <button><span>!</span><div><b>Delete account</b><small>This action cannot be undone</small></div><i>›</i></button>
      </div>
      <p className="version">Tag · Version 1.0 foundation</p>
    </section>}

    {/* HELP */}
    {screen==='help' && <section>
      <Header title="Help & support" onBack={()=>go('profile')}/>
      <div className="helpHero"><div>?</div><h2>How can we help?</h2><p>Find answers or contact the Tag team.</p></div>
      <div className="settingsGroup">
        <button><span>?</span><div><b>How matching works</b><small>Understand Tag compatibility</small></div><i>›</i></button>
        <button><span>⌾</span><div><b>Safety centre</b><small>Stay safe while using Tag</small></div><i>›</i></button>
        <button><span>✉</span><div><b>Contact support</b><small>We're here to help</small></div><i>›</i></button>
      </div>
    </section>}

    {/* EMPTY / FALLBACK */}
    {screen==='history' && <section><Header title="History" onBack={()=>go('tags')}/><Empty icon="◇" title="No completed Tags yet" text="Your completed journeys and reputation will appear here."/></section>}

    {navScreens.includes(screen) && <Nav screen={screen} go={go}/>}
  </div></main>
}

export default App
