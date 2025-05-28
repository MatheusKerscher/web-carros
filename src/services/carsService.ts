import { v4 as uuid } from "uuid";

import type { UserProps } from "../types/User";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "../common/config/firebase";
import type { UploadCarImageData } from "../pages/Dashboard/CarForm/types";
import { toast } from "react-toastify";
import type { FormData } from "../pages/Dashboard/CarForm";
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import type { CarProps } from "../types/car";

const carsService = {
  uploadCarImage: async (
    image: File,
    user: UserProps
  ): Promise<UploadCarImageData | null> => {
    const currentUid = user.uuid;
    const imageUid = uuid();

    const uploadRef = ref(storage, `images/${currentUid}/${imageUid}`);

    try {
      const snapshot = await uploadBytes(uploadRef, image);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return {
        name: imageUid,
        uid: currentUid,
        previewUrl: URL.createObjectURL(image),
        url: downloadUrl,
      };
    } catch {
      toast.error(
        "Erro ao fazer upload da imagem. Por favor, tente novamente mais tarde"
      );
      return null;
    }
  },
  deleteCarImage: async (image: UploadCarImageData) => {
    try {
      const imageRef = ref(storage, `images/${image.uid}/${image.name}`);
      await deleteObject(imageRef);
      return true;
    } catch {
      toast.error(
        "Falha ao deletar imagem. Por favor, tente novamente mais tarde"
      );
      return false;
    }
  },
  createCar: async (
    user: UserProps,
    carData: FormData,
    imageList: UploadCarImageData[]
  ): Promise<boolean> => {
    try {
      const carImages = imageList.map((image) => {
        return {
          uid: image.uid,
          name: image.name,
          url: image.url,
        };
      });

      await addDoc(collection(db, "cars"), {
        carName: carData.carName,
        model: carData.model,
        year: carData.year,
        mileage: carData.mileage,
        price: carData.price,
        city: carData.city,
        whatsapp: carData.whatsapp,
        description: carData.description,
        created: new Date(),
        uid: user.uuid,
        owner: user.name,
        images: carImages,
      });

      return true;
    } catch {
      toast.error("Erro ao cadastrar o carro");
      return false;
    }
  },
  listAllCars: async (): Promise<CarProps[]> => {
    try {

      const carsRef = collection(db, "cars")
      const queryRef = query(carsRef, orderBy("created", "desc"))
      const snapshot = await getDocs(queryRef)
      const carList: CarProps[] = snapshot.docs.map((doc) => {
        const docData = doc.data()
        
        return {
          id: doc.id,
          uid: docData.uid,
          carName: docData.carName,
          year: docData.year,
          city: docData.city,
          mileage: docData.mileage,
          price: docData.price,
          images: docData.images          
        }
      })

      return carList
    } catch {
      return []
    }
  },
  listUserCars: () => {}
};

export default carsService;
