export const getCardDta=async ()=>{
    const res=await fetch("https://dummyjson.com/carts");

    const data=await res.json();
    return data;
}