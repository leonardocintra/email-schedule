import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const WriteNowValidationSchema = yup.object(
    {
        destinationName: yup.string().required('Preenche o seu nome completo'),
        destinationAddress: yup
            .string()
            .email('Preencha um emmail válido')
            .required('Preenche o email.'),
        dueDate: yup.string().required('Informe a data'),
        subject: yup.string().required('Informe o assunto'),
        body: yup.string().required('Informe o conteudo'),
    }
);


export const WriteNowResolver = yupResolver(WriteNowValidationSchema);