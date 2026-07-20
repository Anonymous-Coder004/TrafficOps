export default function FormSection({

    title,

    subtitle,

    children,

}) {

    return (

        <section
            className="
                bg-white
                rounded-2xl
                border
                border-slate-200
                shadow-sm
                p-8
            "
        >

            <div className="mb-8">

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-slate-900
                    "
                >
                    {title}
                </h2>

                {

                    subtitle && (

                        <p
                            className="
                                mt-2
                                text-slate-500
                            "
                        >

                            {subtitle}

                        </p>

                    )

                }

            </div>

            {children}

        </section>

    );

}