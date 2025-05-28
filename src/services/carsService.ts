import { v4 as uuid } from "uuid";

import type { UserProps } from "../types/User";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../common/config/firebase";
import type { UploadCarImageData } from "../pages/Dashboard/CarForm/types";
import { toast } from "react-toastify";

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
};

export default carsService;
