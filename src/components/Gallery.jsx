import React, { useState } from "react";
import { motion } from "framer-motion";
import "../Styles/Gallery.css";


import p1 from "../assets/img.jpg";
import p2 from "../assets/img1.jpg";
import p3 from "../assets/img2.jpg";
import p4 from "../assets/img3.jpg";
import e1 from "../assets/img4.jpg";
import e2 from "../assets/img5.jpg";
import e3 from "../assets/ga1.jpg";
import e4 from "../assets/ga2.jpg";


const Gallery = () => {

const [selectedImage, setSelectedImage] = useState(null);

const photoGallery = [p1,p2,p3,p4];
const eventPhotos = [e1,e2,e3,e4];

return (

<div className="gallery-page">

<h1 className="gallery-title">Our Gallery</h1>



<section className="gallery-section">

<h2>Photo Gallery</h2>

<div className="gallery-grid">

{photoGallery.map((img,index)=>(
<motion.div
className="gallery-card"
key={index}
whileHover={{scale:1.08}}
onClick={()=>setSelectedImage(img)}
>

<img src={img} alt="gallery"/>

</motion.div>
))}

</div>

</section>



<section className="gallery-section">

<h2>Event Photos</h2>

<div className="gallery-grid">

{eventPhotos.map((img,index)=>(
<motion.div
className="gallery-card"
key={index}
whileHover={{scale:1.08}}
onClick={()=>setSelectedImage(img)}
>

<img src={img} alt="event"/>

</motion.div>
))}

</div>

</section>



{selectedImage && (

<div className="image-popup" onClick={()=>setSelectedImage(null)}>

<img src={selectedImage} alt="popup"/>

</div>

)}

</div>

);

};

export default Gallery;