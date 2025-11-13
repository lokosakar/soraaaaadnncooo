export default function HeroBanner(){
return (
<section style={{ backgroundImage: 'url(/banner.jpg)', backgroundSize:'cover', backgroundPosition:'center', height: 320, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }}>
<div style={{ textAlign:'center', backdropFilter:'brightness(0.6)'}}>
<h1 style={{ fontSize:36, margin:0 }}>SORA & CO.</h1>
<p style={{ fontSize:18, marginTop:8 }}>Fashion for Every Story — minimalis, inklusif, nyaman</p>
</div>
</section>
);
}