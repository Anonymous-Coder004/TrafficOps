export default function InputField({

    label,

    name,

    value,

    onChange,

    placeholder = "",

    type = "text",

    required = false,

    disabled = false,

    error = "",

}) {

    return (

        <div className="space-y-2">

            <label
                htmlFor={name}
                className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                "
            >

                {label}

                {

                    required && (

                        <span className="text-red-500 ml-1">

                            *

                        </span>

                    )

                }

            </label>

            <input

                id={name}

                name={name}

                type={type}

                value={value}

                onChange={onChange}

                placeholder={placeholder}

                required={required}

                disabled={disabled}

                className={`
                    w-full
                    h-12
                    rounded-xl
                    border
                    px-4
                    outline-none
                    transition
                    bg-white

                    ${
                        error
                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    }

                    ${
                        disabled
                            ? "bg-slate-100 cursor-not-allowed"
                            : ""
                    }
                `}

            />

            {

                error && (

                    <p className="text-sm text-red-500">

                        {error}

                    </p>

                )

            }

        </div>

    );

}