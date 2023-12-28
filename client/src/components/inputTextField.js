import { TextField } from "@mui/material";

const InputTextField = ({ placeholder, type, ...props }) => (
  <TextField
    placeholder={placeholder}
    variant="outlined"
    margin="normal"
    type={type}
    fullWidth
    sx={{
      "& .MuiInputBase-root": {
        backgroundColor: "#224957",
        color: "white",
        borderRadius: "10px",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#224957",
      },
      "& .MuiInputLabel-root": {
        color: "white",
      },
      "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
        color: "white",
      },
    }}
    {...props}
  />
);

export default InputTextField;
