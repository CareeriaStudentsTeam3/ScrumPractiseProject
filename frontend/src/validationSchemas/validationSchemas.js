import * as yup from 'yup'
// Only letters no whitespace no nothing no ä or ö
const REGEX_ONLY_LETTERS = '^[a-zA-Z]+$'
// For finland special chars ex. ö ä etc
const REGEX_ONLY_LETTERS_ASCII = '^[A-Za-z\\u0080-\\uFFFF -]+$'
// Only letters and whitespaces
// const REGEX_ONLY_LETTERS_WHITESPACE = '^[a-zA-Z\\s]+$'
const REGEX_ONLY_LETTERS_WHITESPACE_ASCII = '^[A-Za-z\\u0080-\\uFFFF - \\s]+$'

// For phone numbers
const REGEX_PHONE_NUMBER =
  '^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$'

const REGEX_NO_SPECIAL_CHAR = '^[A-Za-z\\u0080-\\uFFFF - \\s][^*<>$_&"]*$'

// List of supported image formats
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

export const appointmentDateValidationSchema = yup.object({
  beginning: yup.string().required('Pakollinen'),
  end: yup.string().required('Pakollinen'),
  max_group_size: yup
    .number()
    .positive()
    .min(3, 'Pienin ryhmäkoko on 3')
    .max(8, 'Isoin ryhmäkoko on 8')
    .required('Pakollinen'),
})

export const serviceValidationSchema = yup.object({
  service_name: yup.string().max(20, 'Liian pitkä').required('Pakollinen'),
  duration: yup.number().integer().positive().required('Pakollinen'),
  price: yup.number().positive().required('Pakollinen'),
  max_group_size: yup
    .number()
    .positive()
    .min(3, 'Pienin ryhmäkoko on 3')
    .max(8, 'Isoin ryhmäkoko on 8'),
})

export const loginValidationSchema = yup.object({
  username: yup.string().max(20, 'Liian pitkä').required('Pakollinen'),
  password: yup.string().required('Pakollinen'),
})

export const hairModelValidationSchema = yup.object({
  // TODO: All validations
  first_name: yup
    .string('Anna etunimi')
    .max(30, 'Etunimi saa olla enintään 30 merkkiä pitkä')
    .matches(REGEX_ONLY_LETTERS_ASCII, 'Käytä pelkkiä kirjaimia')
    .required('Anna etunimi'),
  last_name: yup
    .string('Anna sukunimi')
    .max(50, 'Sukunimi saa olla enintään 50 merkkiä pitkä')
    .matches(REGEX_ONLY_LETTERS_ASCII, 'Käytä pelkkiä kirjaimia')
    .required('Anna sukunimi'),
  city: yup
    .string('Anna kaupunki')
    .max(50, 'Kaupunki saa olla enintään 50 merkkiä pitkä')
    .matches(REGEX_ONLY_LETTERS_ASCII, 'Käytä pelkkiä kirjaimia')
    .required('Anna kaupunki'),
  phone: yup
    .string('Anna puhelinnumero')
    .max(20, 'Puhelinnumero saa olla enintään 20 merkkiä pitkä')
    .matches(REGEX_PHONE_NUMBER, 'Tarkista puhelinnumeron muoto')
    .required('Anna puhelinnumero'),
  email: yup
    .string('Anna sähköpostiosoite')
    .max(50, 'Sähköposti saa olla enintään 50 merkkiä pitkä')
    .email('Tarkista sähköposti')
    .required('Anna sähköposti'),
  age: yup
    .number()
    .positive('Anna positiivinen luku')
    .integer('Anna kokoluku')
    .required('Anna ikä'),
  gender: yup
    .string('Valitse sukupuoli')
    .matches(REGEX_ONLY_LETTERS, 'Käytä pelkkiä kirjaimia')
    .required('Valitse sukupuoli'),
  hair_length: yup
    .string('Valitse hiustenpituus')
    .matches(REGEX_ONLY_LETTERS, 'Käytä pelkkiä kirjaimia')
    .required('Valitse hiustenpituus'),
  hair_procedures: yup
    .string('Kerro edellisistä käsittelyistä')
    .max(200, 'Enintään 200 merkkiä')
    .matches(
      REGEX_NO_SPECIAL_CHAR,
      'Tarkista ettei tekstissä ole kiellettyjä merkkejä'
    )
    .required('Kerro edellisistä käsittelyistä'),
  image: yup
    .mixed()
    .nullable()
    .notRequired()
    .test(
      'FILE_TYPE',
      'Sallitut kuva muodot .jpg .jpeg .png',
      (value) => !value || SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      'FILE_SIZE',
      'Kuvatiedosto on liian iso',
      (value) => !value || (value && value.size <= 10000000)
    ),
})

export const appointmentValidationSchema = yup.object({
  first_name: yup
    .string('Anna etunimi')
    .max(30, 'Etunimi saa olla enintään 30 merkkiä pitkä')
    .matches(REGEX_ONLY_LETTERS_ASCII, 'Käytä pelkkiä kirjaimia')
    .required('Anna etunimi'),
  last_name: yup
    .string('Anna sukunimi')
    .max(50, 'Sukunimi saa olla enintään 50 merkkiä pitkä')
    .matches(REGEX_ONLY_LETTERS_ASCII, 'Käytä pelkkiä kirjaimia')
    .required('Anna sukunimi'),
  email: yup
    .string('Anna sähköpostiosoite')
    .max(50, 'Sähköpostiosoite saa olla enintään 50 merkkiä pitkä')
    .email('Tarkistä sähköpostiosoite')
    .required('Anna sähköpostiosoite'),
  phone: yup
    .string('Anna puhelinnumero')
    .max(20, 'Puhelinnumero saa olla enintään 20 merkkiä pitkä')
    .matches(REGEX_PHONE_NUMBER, 'Tarkista puhelinnumeron muoto')
    .required('Anna puhelinnumero'),
  place: yup
    .string('Anna paikka')
    .matches(REGEX_ONLY_LETTERS_WHITESPACE_ASCII, 'Käytä pelkkiä kirjaimia')
    .required('Ilmoita haluttu paikka palvelulle'),
  info: yup
    .string('Anna lisätietoja')
    .max(200, 'Enintään 200 merkkiä')
    .matches(
      REGEX_NO_SPECIAL_CHAR,
      'Tarkista ettei tekstissä ole kiellettyjä merkkejä'
    )
    .required('Anna lisätietoja'),
})
