import { Button, DateTimePicker, Nav, RichInput } from "../components";

export function WriteNowPage() {
    return (
        <>
            <Nav />
            <div className="container">
                <h1>Escrever algo agora</h1>

                <form action="" className="form">
                    <label htmlFor="destinationName">Nome completo</label>
                    <input type="text" name="destinationName" id="destinationName" />
                    <label htmlFor="destinationAddress">E-mail</label>
                    <input type="email" name="destinationAddress" id="destinationAddress" />
                    <label htmlFor="dueDate">Data</label>
                    <DateTimePicker />
                    <label htmlFor="subject">Assunto</label>
                    <input type="email" name="subject" id="subject" />
                    <label htmlFor="body">Mensagem</label>
                    <RichInput />

                    <Button variant="dark" type="submit">Enviar</Button>
                </form>
            </div>
        </>
    )
}