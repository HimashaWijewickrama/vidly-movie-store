import { Col, Stack } from "react-bootstrap";

export default function Footer() {
  return (
    <Stack direction="horizontal" gap={3} className="footer-section">
      <div className="p-2 " id="footer-text">
        <Col>© 2024 VIDLY | All rights reserved</Col>
      </div>
    </Stack>
  );
}
