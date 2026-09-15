import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { userSchema } from "../../validation/userValidation";
import { createUser, updateUser, fetchUserById } from "../../api/users";
import "../../styles/userForm.css";

export default function UserForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      age: "",
      address: "",
      gender: "",
    },
  });

  useEffect(() => {
    if (!isEditMode) return;

    fetchUserById(id).then((user) => {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        contact: user.phone || "",
        age: user.age || "",
        address:
          typeof user.address === "string"
            ? user.address
            : user.address?.address || "",
        gender: user.gender || "",
      });
    });
  }, [id, isEditMode, reset]);

  async function onSubmit(data) {
    try {
      if (isEditMode) {
        await updateUser(id, data);
      } else {
        await createUser(data);
      }

      reset();
      navigate("/users");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="page-container">
      <h1>{isEditMode ? "Edit User" : "Add User"}</h1>

      <form className="user-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-field">
          <label htmlFor="firstName">
            Name <span className="required-star">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            className={errors.firstName ? "input-error" : ""}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="form-error">{errors.firstName.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="lastName">
            Last Name <span className="required-star">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            className={errors.lastName ? "input-error" : ""}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="form-error">{errors.lastName.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="email">
            Email <span className="required-star">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={errors.email ? "input-error" : ""}
            {...register("email")}
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="contact">
            Contact <span className="required-star">*</span>
          </label>
          <input
            id="contact"
            type="text"
            className={errors.contact ? "input-error" : ""}
            {...register("contact")}
          />
          {errors.contact && (
            <p className="form-error">{errors.contact.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="age">
            Age <span className="required-star">*</span>
          </label>
          <input
            id="age"
            type="number"
            className={errors.age ? "input-error" : ""}
            {...register("age")}
          />
          {errors.age && <p className="form-error">{errors.age.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="address">
            Address <span className="required-star">*</span>
          </label>
          <textarea
            id="address"
            rows="3"
            className={errors.address ? "input-error" : ""}
            {...register("address")}
          />
          {errors.address && (
            <p className="form-error">{errors.address.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="gender">
            Gender <span className="required-star">*</span>
          </label>
          <select
            id="gender"
            className={errors.gender ? "input-error" : ""}
            {...register("gender")}
          >
            <option value="" disabled hidden>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="form-error">{errors.gender.message}</p>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button" disabled={isSubmitting}>
            {isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Adding..."
              : isEditMode
              ? "Update"
              : "Add"}
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/users")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}