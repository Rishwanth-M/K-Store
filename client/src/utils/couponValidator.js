const coupon = {
    Kreedentials5: 5,
    Kreedentials10: 10,
    Kreedentials15: 15,
    Kreedentials20: 20,
    Kreedentials25: 25,
    Kreedentials30: 30,
};


export const couponValidator = (couponCode) => {
    return coupon[couponCode] ? coupon[couponCode] : false;
};
