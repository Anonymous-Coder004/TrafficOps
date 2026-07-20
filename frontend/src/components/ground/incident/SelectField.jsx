export default function SelectField({

    label,

    name,

    value,

    onChange,

    options = [],

    placeholder = "Select an option",

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

                        <span className="ml-1 text-red-500">

                            *

                        </span>

                    )

                }

            </label>

            <select

                id={name}

                name={name}

                value={value}

                onChange={onChange}

                required={required}

                disabled={disabled}

                className={`
                    w-full
                    h-12
                    rounded-xl
                    border
                    px-4
                    bg-white
                    outline-none
                    transition

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
            >

                <option value="">

                    {placeholder}

                </option>

                {

                    options.map((option) => (

                        <option

                            key={option.value}

                            value={option.value}

                        >

                            {option.label}

                        </option>

                    ))

                }

            </select>

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