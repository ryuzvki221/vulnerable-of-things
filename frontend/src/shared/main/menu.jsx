import PropTypes from "prop-types";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { styled } from "@mui/material/styles";
import { Stack, Link } from "@mui/material";

const LinkStyle = styled(Link)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.primary,
    marginRight: theme.spacing(5),
    transition: theme.transitions.create("opacity", {
        duration: theme.transitions.duration.shorter,
    }),
    "&:hover": {
        opacity: 0.48,
        textDecoration: "none",
    },
}));

function MenuDesktopItem({ item }) {
    const { pathname } = useRouter();
    const { title, path } = item;
    const isActive = pathname === path;

    return (
        <LinkStyle
            component={NextLink}
            href={path}
            passHref
            sx={{
                ...(isActive && { color: "primary.dark" }),
            }}
        >
            {title}
        </LinkStyle>
    );
}

MenuDesktopItem.propTypes = {
    item: PropTypes.shape({
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default function MenuDesktop({ config }) {
    return (
        <Stack direction="row">
            {config.map((item) => (
                <MenuDesktopItem key={item.title} item={item} />
            ))}
        </Stack>
    );
}

MenuDesktop.propTypes = {
    config: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
};
