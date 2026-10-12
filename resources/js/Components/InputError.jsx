export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'field-error ' + className}>
            {message}
        </p>
    ) : null;
}
