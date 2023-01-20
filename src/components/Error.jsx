export default function Error(props) {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold text-error">{props.code}</h1>
                    <p className="py-6">{props.children}</p>
                    <a href="/"><button className="btn btn-primary">Go home?</button></a>
                </div>
            </div>
        </div>
    )
}