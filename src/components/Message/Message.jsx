import style from './Message.module.css'

export const Message = (props) => {
    return <form className={style.message}>
        <h2 style={{backgroundColor: 'gray'}}>Message</h2>
        <p>Message: { props.text }</p>
    </form>
}
