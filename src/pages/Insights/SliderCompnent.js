import { Slider, Stack, Typography, Card } from '@mui/material'

export default function FilterOptions(props) {
    let minDistance = 10;
    // const marks = [{ label: props.min, value: props.min }, { label: props.max, value: props.max }]
    const handleChangeTransValue = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            props.setSliderRange([Math.min(newValue[0], props.sliderRange[1] - minDistance), props.sliderRange[1]]);
        } else {
            props.setSliderRange([props.sliderRange[0], Math.max(newValue[1], props.sliderRange[0] + minDistance)]);
        }
    };
    function valuetext(value) {
        return `${value}`;
    }
    return (
        <Card sx={{ width: '100%', mb: 1, p: 4, borderRadius: 3 }} variant='outlined'>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center" width={'100%'}>
                <Typography sx={{ fontSize: 14, width: '70%' }}>{props.name}</Typography>
                <Typography sx={{ fontSize: 12, fontWeight: 500 }}>{props.min}</Typography>
                <Slider
                    value={props.sliderRange}
                    step={10}
                    getAriaValueText={valuetext}
                    onChange={handleChangeTransValue}
                    valueLabelDisplay="auto"
                    disableSwap
                    // marks={marks}
                    min={props.min}
                    max={props.max}
                    size={'small'}
                    sx={{ color: '#872ff7' }}
                />
                <Typography sx={{ fontSize: 12, fontWeight: 500 }}>{props.max}</Typography>
            </Stack>
        </Card>
    )
}