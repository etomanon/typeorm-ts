import styled from "styled-components";
import {
  width,
  WidthProps,
  space,
  SpaceProps,
  color,
  ColorProps
} from "styled-system";

export const DownloadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const DownloadHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
`;

export const DownloadHeaderCell = styled.div<WidthProps & SpaceProps>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  ${width};
  ${space};
`;

export const DownloadRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    flex-direction: row;
  }
`;

interface DownloadIconProps {
  visible?: true;
}

export const DownloadIcon = styled.div<DownloadIconProps & ColorProps & SpaceProps>`
  color: ${({ theme }) => theme.colors.primary};
  ${color};
  opacity: ${props => props.visible ? 1 : 0};
  transition: all 0.2s ease-in;
  ${/*sc-selector*/ DownloadRow}:hover & {
    color: #fff ${color};
    opacity: 1;
  }
  @media (hover: none) {
    opacity: 1;
  }
  ${space};
`;

export const DownloadCell = styled.div<WidthProps & SpaceProps>`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  ${width};
  ${space};
`;
