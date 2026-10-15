import { lazy,Suspense,useEffect,useRef,useState,Component,type ReactNode } from 'react';
import { Orbit } from 'lucide-react';
import { useFinance } from './store';
const Scene=lazy(()=>import('./ThreeDScene'));
class Boundary extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true}}render(){return this.state.failed?<div className="sculpture-fallback"><Orbit/></div>:this.props.children}}
export function ThreeDHero({orb=false}:{orb?:boolean}){const {theme}=useFinance();const ref=useRef<HTMLDivElement>(null);const [colors,setColors]=useState<string[]>([]);const [visible,setVisible]=useState(true);const [motion,setMotion]=useState(true);const [supported,setSupported]=useState(false);
 useEffect(()=>{const css=getComputedStyle(document.documentElement);setColors(['--sculpture-primary','--sculpture-rim','--sculpture-white'].map(k=>css.getPropertyValue(k).trim()));const c=document.createElement('canvas');setSupported(!!c.getContext('webgl2'));const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setMotion(!media.matches);update();media.addEventListener('change',update);const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting));if(ref.current)observer.observe(ref.current);return()=>{observer.disconnect();media.removeEventListener('change',update)}},[theme]);
 return <div className="sculpture" ref={ref} aria-hidden="true"><Boundary>{supported&&colors.length>0?<Suspense fallback={<div className="sculpture-fallback"><Orbit/></div>}><Scene orb={orb} colors={colors} motion={motion} visible={visible}/></Suspense>:<div className="sculpture-fallback"><Orbit/></div>}</Boundary></div>
}
