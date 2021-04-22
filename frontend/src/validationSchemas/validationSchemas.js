import * as yup from 'yup'

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
    .required('Anna etunimi'),
  last_name: yup
    .string('Anna sukunimi')
    .max(50, 'Sukunimi saa olla enintään 50 merkkiä pitkä')
    .required('Anna sukunimi'),
  city: yup
    .string('Anna kaupunki')
    .max(50, 'Kaupunki saa olla enintään 50 merkkiä pitkä')
    .required('Anna kaupunki'),
  phone: yup
    .string('Anna puhelinnumero')
    .max(13, 'Puhelinnumero saa olla enintään 13 merkkiä pitkä')
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
  gender: yup.string('Valitse sukupuoli').required('Valitse sukupuoli'),
  hair_length: yup
    .string('Valitse hiustenpituus')
    .required('Valitse hiustenpituus'),
  hair_procedures: yup
    .string('Kerro edellisistä käsittelyistä')
    .max(200, 'Enintään 200 merkkiä')
    .required('Kerro edellisistä käsittelyistä'),
  image: yup
    .mixed()
    .nullable()
    .notRequired()
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
    .required('Anna etunimi'),
  last_name: yup
    .string('Anna sukunimi')
    .max(50, 'Sukunimi saa olla enintään 50 merkkiä pitkä')
    .required('Anna sukunimi'),
  email: yup
    .string('Anna sähköpostiosoite')
    .max(50, 'Sähköpostiosoite saa olla enintään 50 merkkiä pitkä')
    .email('Tarkistä sähköpostiosoite')
    .required('Anna sähköpostiosoite'),
  phone: yup
    .string('Anna puhelinnumero')
    .max(13, 'Puhelinnumero saa olla enintään 13 merkkiä pitkä')
    .required('Anna puhelinnumero'),
  place: yup
    .string('Anna paikka')
    .required('Ilmoita haluttu paikka palvelulle'),
  info: yup
    .string('Anna lisätietoja')
    .max(200, 'Enintään 200 merkkiä')
    .required('Anna lisätietoja'),
})
