import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface ComponentProps {
  building: {
    img: string;
    title: string;
    description: string[];
  };

  imageSide?: "left" | "right";
  center?: boolean;
}

function BuildCard({
  building,
  imageSide = "left",
  center = false,
}: ComponentProps) {
  if (center) {
    return (
      <Card sx={{p: 3,height: "100%",textAlign: "center",boxShadow: "none",border: "none",}}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            borderBottom: "2px solid #333",
            pb: 1,
            mb: 2,
          }}
        >
          {building.title}
        </Typography>

        {building.description.map((item, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{
              mb: 1,
              lineHeight: 1.8,
            }}
          >
            {item}
          </Typography>
        ))}

        <Button
          size="small"
          sx={{
            mt: 2,
            color: "#8b7355",
          }}
        >
          Подробнее»
        </Button>
      </Card>
    );
  }

  // Левая и правая карточки
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: {lg: imageSide === "right" ? "row-reverse" : "row", xs: 'column'},
        mb: 3,
        border: "2px solid #ccc",
        borderRadius: 0,
        boxShadow: "none",
        p: 2,
        minHeight: 220,
      }}
    >
      <CardMedia
        component="img"
        image={building.img}
        alt={building.title}
        sx={{
          width: {lg:140, xs:'100%'},
          objectFit: "cover",
          flexShrink: 0,
        }}
      />

      <Box
        sx={{
          flex: 1,
          px: 2,
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              borderBottom: "2px solid #333",
              pb: 1,
              mb: 2,
              textAlign: { lg:imageSide === "right" ? "right" : "left", xs:'center'},
            }}
          >
            {building.title}
          </Typography>

          {building.description.map((item, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                color: "#555",
                lineHeight: 1.7,
                mb: 1,
                textAlign: {lg:imageSide === "right" ? "right" : "left", xs:'center'},
              }}
            >
              {item}
            </Typography>
          ))}
        </CardContent>

        <Box
          sx={{
            mt: 2,
            textAlign: {lg: imageSide === "right" ? "right" : "left",xs: 'center'},
          }}
        >
          <Button
            size="small"
            sx={{
              color: "#8b7355",
            }}
          >
            Подробнее»
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default BuildCard;