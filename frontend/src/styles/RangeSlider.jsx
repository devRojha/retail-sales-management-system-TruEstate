import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider({ value, setValue }) {
  const handleChange = (_, newValue) => setValue(newValue);

  return (
    <Box sx={{ width: 150 }}>
      <Slider value={value} onChange={handleChange} valueLabelDisplay="auto" getAriaLabel={() => 'Age range'} getAriaValueText={valuetext} min={0} max={100}/>
    </Box>
  );
}