interface Props extends React.ComponentPropsWithoutRef<'svg'>{
    imagepath: string;
}


export function ErrorCodeIllustration(props: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 362 145" {...props}>
            <path
                fill="currentColor"
                d={props.imagepath}
            />
        </svg>
    );
}