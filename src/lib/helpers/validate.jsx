export const validateEmail = (email) => {
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export const validatePIN = (pin) => {
  return /^\d+$/.test(pin) && pin.length == 10;
};

export const validateIsNumber = (text) => {
  return /^\d+$/.test(text);
};

export const validateTextNotEmpty = (text) => {
  return text == "" || text.length == 0;
};
