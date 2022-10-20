import { FormProvider, useForm } from "react-hook-form";
import { Button, DateTimePicker, Nav, RichInput } from "../components";
import { IWriteNowForm } from "../interfaces";
import { MailsServices } from "../services";
import { WriteNowResolver } from "../validations";

export function WriteNowPage() {

    const formMethods = useForm<IWriteNowForm>({ resolver: WriteNowResolver });
    const { formState: { errors }, register, handleSubmit, reset } = formMethods;

    async function aoSalvar(values: IWriteNowForm) {
        const { status } = await MailsServices.sendEmail(values);

        if (status === 201) {
            reset();
        }
    }

    return (
        <>
            <Nav />
            <div className="container">
                <h1>Escrever algo agora</h1>

                <FormProvider {...formMethods}>
                    <form action="" className="form" onSubmit={handleSubmit(aoSalvar)}>
                        <label htmlFor="destinationName">Nome completo</label>
                        <input {...register('destinationName')} type="text" />
                        {errors?.destinationName?.message && (
                            <p className="error-text">{errors?.destinationName?.message}</p>
                        )}

                        <label htmlFor="destinationAddress">E-mail</label>
                        <input {...register('destinationAddress')} type="email" />
                        {errors?.destinationAddress?.message && (
                            <p className="error-text">{errors?.destinationAddress?.message}</p>
                        )}

                        <label htmlFor="dueDate">Data</label>
                        <DateTimePicker name="dueDate" />
                        {errors?.dueDate?.message && (
                            <p className="error-text">{errors?.dueDate?.message}</p>
                        )}

                        <label htmlFor="subject">Assunto</label>
                        <input {...register('subject')} type="text" />
                        {errors?.subject?.message && (
                            <p className="error-text">{errors?.subject?.message}</p>
                        )}

                        <label htmlFor="body">Mensagem</label>
                        <RichInput name="body" />
                        {errors?.body?.message && (
                            <p className="error-text">{errors?.body?.message}</p>
                        )}

                        <Button variant="dark" type="submit">Enviar</Button>
                    </form>
                </FormProvider>
            </div>
        </>
    )
}