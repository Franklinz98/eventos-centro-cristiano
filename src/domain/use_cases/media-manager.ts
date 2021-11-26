import { SelectionState, SelectionValue } from "@/domain/interfaces/common";

export default abstract class ImageManager {
  static getFile(
    files: FileList | null,
    state?: SelectionState
  ): SelectionValue {
    const file = state === SelectionState.Image ? files?.[0] : undefined;
    return {
      file,
      url: file ? URL.createObjectURL(file) : "",
    };
  }

  static checkFile(input: HTMLInputElement): SelectionState | undefined {
    const allowedImgExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (input.files?.length) {
      if (allowedImgExtensions.exec(input.value)) {
        return SelectionState.Image;
      } else {
        return SelectionState.NotValid;
      }
    }
  }

  static getMediaErrorMessage(): string {
    return "El archivo seleccionado no corresponde a una imagen. Las extensiones permitidas son: *.jpg, *.jpeg, *.png.";
  }
}
