import { avatarForm, avatarImg, avatarBtnEdit } from "./constants";
export function enableIconEdit() {
  avatarForm.addEventListener("mouseover", () => {
    avatarImg.style.opacity = "0.5";
    avatarImg.style.transition = "0.2s";
    avatarImg.style.cursor = "pointer";
    avatarBtnEdit.style.display = "block";
    avatarBtnEdit.style.transition = "0.2s";
    avatarBtnEdit.style.cursor = "pointer";
  });
  avatarForm.addEventListener("mouseout", () => {
    avatarImg.style.opacity = "";
    avatarImg.style.transition = "";
    avatarImg.style.cursor = "none";
    avatarBtnEdit.style.display = "none";
  });
}
