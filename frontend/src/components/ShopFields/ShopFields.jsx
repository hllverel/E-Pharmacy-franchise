import FormInput from '../FormInput/FormInput';

export default function ShopFields({ register, errors }) {
  return (
    <>
      <FormInput
        label="Shop Name"
        placeholder="Enter text"
        error={errors.name}
        registration={register('name')}
      />
      <FormInput
        label="Shop Owner Name"
        placeholder="Enter text"
        autoComplete="name"
        error={errors.ownerName}
        registration={register('ownerName')}
      />
      <FormInput
        label="Email address"
        type="email"
        placeholder="Enter text"
        autoComplete="email"
        error={errors.email}
        registration={register('email')}
      />
      <FormInput
        label="Phone Number"
        type="tel"
        placeholder="Enter text"
        autoComplete="tel"
        error={errors.phone}
        registration={register('phone')}
      />
      <FormInput
        label="Street address"
        placeholder="Enter text"
        autoComplete="street-address"
        error={errors.street}
        registration={register('street')}
      />
      <FormInput
        label="City"
        placeholder="Enter text"
        autoComplete="address-level2"
        error={errors.city}
        registration={register('city')}
      />
      <FormInput
        label="Zip / Postal"
        placeholder="Enter text"
        autoComplete="postal-code"
        error={errors.zip}
        registration={register('zip')}
      />
    </>
  );
}