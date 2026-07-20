export default function DashboardSection({

    title,

    subtitle,

    children,

}) {

    return (

        <section className="space-y-6">

            <div>

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

                    subtitle &&

                    <p
                        className="
                            mt-1
                            text-gray-500
                        "
                    >
                        {subtitle}
                    </p>

                }

            </div>

            {children}

        </section>

    );

}