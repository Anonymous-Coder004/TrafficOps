import { useState } from "react";

import FormSection from "./FormSection";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import SelectField from "./SelectField";

import LocationPickerModal from "../../maps/views/LocationPickerModal";

import {
    EVENT_TYPES,
    EVENT_CAUSES,
    VEHICLE_TYPES,
} from "../../../constants/incidentOptions";

const initialForm = {

    title: "",

    description: "",

    event_type: "",

    event_cause: "",

    vehicle_type: "",

    latitude: null,

    longitude: null,

};

export default function IncidentForm({

    loading = false,

    onSubmit,

}) {

    const [form, setForm] = useState(initialForm);

    const [errors, setErrors] = useState({});

    const [mapOpen, setMapOpen] = useState(false);

    function handleChange(e) {

        const { name, value } = e.target;

        setForm((prev) => ({

            ...prev,

            [name]: value,

        }));

    }

    function handleLocationSelect(coords) {

    setForm((prev) => ({

        ...prev,

        latitude: coords.lat,

        longitude: coords.lng,

    }));

}

    function validate() {

        const err = {};

        if (!form.title.trim())
            err.title = "Title is required.";

        if (!form.description.trim())
            err.description = "Description is required.";

        if (!form.event_type)
            err.event_type = "Select event type.";

        if (!form.event_cause)
            err.event_cause = "Select event cause.";

        if (!form.vehicle_type)
            err.vehicle_type = "Select vehicle type.";

        if (
            form.latitude === null ||
            form.longitude === null
        ) {
            err.location = "Select incident location.";
        }

        setErrors(err);

        return Object.keys(err).length === 0;

    }

    function handleSubmit(e) {

        e.preventDefault();

        if (!validate())
            return;

        onSubmit(form);

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >

            <FormSection

                title="Incident Details"

                subtitle="Fill in the incident information."

            >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <InputField

                        label="Incident Title"

                        name="title"

                        value={form.title}

                        onChange={handleChange}

                        error={errors.title}

                        required

                    />

                    <SelectField

                        label="Event Type"

                        name="event_type"

                        value={form.event_type}

                        onChange={handleChange}

                        options={EVENT_TYPES}

                        error={errors.event_type}

                        required

                    />

                    <SelectField

                        label="Event Cause"

                        name="event_cause"

                        value={form.event_cause}

                        onChange={handleChange}

                        options={EVENT_CAUSES}

                        error={errors.event_cause}

                        required

                    />

                    <SelectField

                        label="Vehicle Type"

                        name="vehicle_type"

                        value={form.vehicle_type}

                        onChange={handleChange}

                        options={VEHICLE_TYPES}

                        error={errors.vehicle_type}

                        required

                    />

                </div>

                <div className="mt-6">

                    <TextareaField

                        label="Description"

                        name="description"

                        value={form.description}

                        onChange={handleChange}

                        error={errors.description}

                        required

                    />

                </div>

            </FormSection>

            <FormSection

                title="Incident Location"

                subtitle="Select the exact incident location."

            >

                <div className="grid grid-cols-2 gap-6">

                    <InputField

                        label="Latitude"

                        name="latitude"

                        value={form.latitude ?? ""}

                        disabled

                    />

                    <InputField

                        label="Longitude"

                        name="longitude"

                        value={form.longitude ?? ""}

                        disabled

                    />

                </div>

                {

                    errors.location && (

                        <p className="mt-3 text-sm text-red-500">

                            {errors.location}

                        </p>

                    )

                }

                <button

                    type="button"

                    onClick={() => setMapOpen(true)}

                    className="
                        mt-6
                        px-5
                        py-3
                        rounded-xl
                        bg-emerald-600
                        text-white
                        hover:bg-emerald-700
                    "

                >

                    Select Location on Map

                </button>

            </FormSection>

            <div className="flex justify-end">

                <button

                    type="submit"

                    disabled={loading}

                    className="
                        px-8
                        py-3
                        rounded-xl
                        bg-emerald-600
                        text-white
                        font-semibold
                        hover:bg-emerald-700
                        disabled:opacity-50
                    "

                >

                    {

                        loading

                            ? "Reporting..."

                            : "Report Incident"

                    }

                </button>

            </div>

{
    mapOpen && (

        <LocationPickerModal

            onClose={() =>

                setMapOpen(false)

            }

            onSelect={(coords) => {

                handleLocationSelect(coords);

                setMapOpen(false);

            }}

        />

    )

}

        </form>

    );

}