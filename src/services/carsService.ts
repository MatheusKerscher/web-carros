import { v4 as uuid } from "uuid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "../common/config/firebase";
import { toast } from "react-toastify";

import type { UserProps } from "../types/User";
import type { CarImageData } from "../pages/Dashboard/CarForm/types";
import type { FormData } from "../pages/Dashboard/CarForm";
import type { CarDetailsProps, CarProps } from "../types/car";

type DocCarImages = {
  uid: string;
  name: string;
  url: string;
};

const carsService = {
  createCar: async (
    user: UserProps,
    carData: FormData,
    imageList: CarImageData[]
  ): Promise<boolean> => {
    try {
      const currentUid = user.uid;

      const carImageList = await Promise.all(
        imageList.map(async (image) => {
          if (image.file) {
            const imageUid = uuid();
            const uploadRef = ref(storage, `images/${currentUid}/${imageUid}`);

            const snapshot = await uploadBytes(uploadRef, image.file);
            const downloadUrl = await getDownloadURL(snapshot.ref);

            return {
              uid: currentUid,
              name: imageUid,
              url: downloadUrl,
            };
          }
        })
      );

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
        uid: user.uid,
        owner: user.name,
        images: carImageList,
      });

      return true;
    } catch {
      toast.error(
        "Erro ao cadastrar o carro. Por favor, tente novamente mais tarde"
      );
      return false;
    }
  },
  updateCarWithImages: async (
    user: UserProps,
    carData: FormData,
    imageList: CarImageData[],
    carId: string
  ): Promise<boolean> => {
    try {
      const currentUid = user.uid;

      const docRef = doc(db, "cars", carId);
      const snapshot = await getDoc(docRef);
      const docCarImages: DocCarImages[] = snapshot.data()?.images;

      if (docCarImages) {
        const imagesToDelete: string[] = [];

        docCarImages.forEach((docImage) => {
          if (!imageList.some((i) => i.name === docImage.name)) {
            imagesToDelete.push(docImage.name);
          }
        });

        await Promise.all(
          imagesToDelete.map(async (image) => {
            const imageRef = ref(storage, `images/${currentUid}/${image}`);
            await deleteObject(imageRef);
          })
        );

        const carImageList: DocCarImages[] = await Promise.all(
          imageList.map(async (image) => {
            if (image.file) {
              const imageUid = uuid();
              const uploadRef = ref(
                storage,
                `images/${currentUid}/${imageUid}`
              );

              const snapshot = await uploadBytes(uploadRef, image.file);
              const downloadUrl = await getDownloadURL(snapshot.ref);

              return {
                uid: currentUid,
                name: imageUid,
                url: downloadUrl,
              };
            } else {
              return {
                uid: currentUid,
                name: image.uid as string,
                url: image.previewUrl as string,
              };
            }
          })
        );

        const carRef = doc(db, "cars", carId);

        await updateDoc(carRef, {
          carName: carData.carName,
          model: carData.model,
          year: carData.year,
          mileage: carData.mileage,
          price: carData.price,
          city: carData.city,
          whatsapp: carData.whatsapp,
          description: carData.description,
          images: carImageList,
        });

        return true;
      }

      return false;
    } catch {
      toast.error(
        "Erro ao atualizar o carro. Por favor, tente novamente mais tarde"
      );
      return false;
    }
  },
  listAllCars: async (): Promise<CarProps[]> => {
    try {
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, orderBy("created", "desc"));
      const snapshot = await getDocs(queryRef);
      const carList: CarProps[] = snapshot.docs.map((doc) => {
        const docData = doc.data();

        return {
          id: doc.id,
          uid: docData.uid,
          carName: docData.carName,
          year: docData.year,
          city: docData.city,
          mileage: docData.mileage,
          price: docData.price,
          images: docData.images,
        };
      });

      return carList;
    } catch {
      return [];
    }
  },
  listUserCars: async (user: UserProps): Promise<CarProps[]> => {
    try {
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user.uid));
      const snapshot = await getDocs(queryRef);
      const carList: CarProps[] = snapshot.docs.map((doc) => {
        const docData = doc.data();

        return {
          id: doc.id,
          uid: docData.uid,
          carName: docData.carName,
          year: docData.year,
          city: docData.city,
          mileage: docData.mileage,
          price: docData.price,
          images: docData.images,
        };
      });

      return carList;
    } catch {
      return [];
    }
  },
  deleteCar: async (userId: string, car: CarProps): Promise<boolean> => {
    try {
      if (userId === car.uid) {
        car.images.forEach(async (image) => {
          const imageRef = ref(storage, `images/${image.uid}/${image.name}`);
          await deleteObject(imageRef);
        });

        const docRef = doc(db, "cars", car.id);
        await deleteDoc(docRef);
        return true;
      }

      return false;
    } catch {
      return false;
    }
  },
  getCarDetails: async (
    carId: string,
    userId?: string
  ): Promise<CarDetailsProps | null> => {
    try {
      const docRef = doc(db, "cars", carId);
      const snapshot = await getDoc(docRef);
      const docData = snapshot.data();

      if (docData) {
        if (userId) {
          if (docData.uid !== userId) {
            return null;
          }
        }

        const car: CarDetailsProps = {
          id: snapshot.id,
          uid: docData.uid,
          carName: docData.carName,
          year: docData.year,
          city: docData.city,
          mileage: docData.mileage,
          price: docData.price,
          images: docData.images,
          model: docData.model,
          description: docData.description,
          whatsapp: docData.whatsapp,
        };

        return car;
      }

      return null;
    } catch {
      return null;
    }
  },
};

export default carsService;
