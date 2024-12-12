import { Dialog, DialogContent, TextField, DialogTitle } from "@mui/material";
import React from "react";

const CreateRecipe = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formJson = Object.fromEntries(formData.entries());
          console.log(formJson);
        },
      }}
    >
      <DialogTitle>Add recipe</DialogTitle>
      <DialogContent>
        <TextField
          required
          id="title"
          name="title"
          label="Recipe name"
          variant="outlined"
        ></TextField>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipe;
