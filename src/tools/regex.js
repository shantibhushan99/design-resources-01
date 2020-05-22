const text = `


`;

text2 = text.replace(/[(]/g, `' , link:'`);
text3 = text2.replace(/[)]/g, `', desc:'`);
text4 = text3.replace(/]/g, ``);
text5 = text4.replace(/[[]/g, `{title:'`);
text6 = text5.replace(/\|/g, ``);

console.log(text6);
