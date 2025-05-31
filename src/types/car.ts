interface CarImageProps {
  name: string;
  uid: string;
  url: string;
};

export interface CarProps {
  id: string;
  carName: string;
  year: string;
  uid: string;
  price: number;
  city: string;
  mileage: string;
  images: CarImageProps[];
};

export interface CarDetailsProps extends CarProps {
  description: string
  model: string
  whatsapp: string
}