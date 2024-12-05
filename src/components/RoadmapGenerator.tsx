import {
  Box,
  Button,
  LoadingOverlay,
  NumberInput,
  Paper,
  Select,
  Modal,
  Title,
  Text,
  Group,
  Input,
  Tabs,
  Grid,
  Badge,
} from "@mantine/core";
import React, { useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "react-flow-renderer";
import Chatbox from "./Chatbox";
import { PieChart } from "@mantine/charts";

export const dataCharts = [
  { name: "USA", value: 400, color: "indigo.6" },
  { name: "India", value: 300, color: "yellow.6" },
  { name: "Japan", value: 300, color: "teal.6" },
  { name: "Other", value: 200, color: "gray.6" },
];

interface GoalDataType {
  goal: string;
  year: string;
}

const RoadmapGenerator = () => {
  const [showChildNodes, setShowChildNodes] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showReactFlow, setShowReactFlow] = useState(false); // ReactFlow visibility state
  const [selectedNode, setSelectedNode] = useState(null); // Node được chọn
  const [modalOpen, setModalOpen] = useState(false); // Trạng thái modal
  const [goalData, setGoalData] = useState<GoalDataType>();

  const handleGeneratorClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowReactFlow(true);
    }, 3000); // Delay 3 giây
  };

  const initialNodes = [
    {
      id: "1",
      type: "default",
      data: {
        label: "Frontend Development in AI",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      position: { x: 250, y: 250 },
      style: { background: "#007bff", color: "#fff", padding: 10 },
    },
    {
      id: "2",
      data: {
        label: "Introduction to Frontend Development",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=kXYiU_JCYtU",
      },
      position: { x: 550, y: 150 },
    },
    {
      id: "3",
      data: {
        label: "Frontend Frameworks and Library",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      position: { x: 550, y: 350 },
    },
    {
      id: "4",
      data: {
        label: "AI Frontend Development",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=kXYiU_JCYtU",
      },
      position: { x: 550, y: 600 },
    },
    {
      id: "5",
      data: {
        label: "Building and Deploying Web Applications",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      position: { x: 550, y: 850 },
    },
    // Level 1
    {
      id: "6",
      data: {
        label: "Basics of Web Development",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=kXYiU_JCYtU",
      },
      position: { x: 750, y: 50 },
    },
    {
      id: "7",
      data: {
        label: "Version Control with Git",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      position: { x: 750, y: 120 },
    },
    {
      id: "8",
      data: {
        label: "Responsive Design",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=kXYiU_JCYtU",
      },
      position: { x: 750, y: 180 },
    },
    {
      id: "9",
      data: {
        label: "Web Accessibility",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      position: { x: 750, y: 220 },
    },
    // Level 2
    {
      id: "10",
      data: {
        label: "React Basics",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=kXYiU_JCYtU",
      },
      position: { x: 750, y: 300 },
    },
    {
      id: "11",
      data: {
        label: "Angular Fundamentals",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      position: { x: 750, y: 350 },
    },
    {
      id: "12",
      data: {
        label: "Vue.js Essentials",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=kXYiU_JCYtU",
      },
      position: { x: 750, y: 400 },
    },
    {
      id: "13",
      data: {
        label: "Testing Frontend Components",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      position: { x: 750, y: 450 },
    },
    // Level 3
    {
      id: "14",
      data: {
        label: "React Basics",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=kXYiU_JCYtU",
      },
      position: { x: 750, y: 550 },
    },
    {
      id: "15",
      data: {
        label: "Angular Fundamentals",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      position: { x: 750, y: 620 },
    },
    {
      id: "16",
      data: {
        label: "Vue.js Essentials",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=kXYiU_JCYtU",
      },
      position: { x: 750, y: 680 },
    },
    {
      id: "17",
      data: {
        label: "Testing Frontend Components",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      position: { x: 750, y: 750 },
    },
    // Level 4
    {
      id: "18",
      data: {
        label: "React Basics",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=kXYiU_JCYtU",
      },
      position: { x: 750, y: 850 },
    },
    {
      id: "19",
      data: {
        label: "Angular Fundamentals",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      position: { x: 750, y: 900 },
    },
    {
      id: "20",
      data: {
        label: "Vue.js Essentials",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=kXYiU_JCYtU",
      },
      position: { x: 750, y: 950 },
    },
    {
      id: "21",
      data: {
        label: "Testing Frontend Components",
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      position: { x: 750, y: 1000 },
    },
  ];

  const initialEdges = [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e1-3", source: "1", target: "3", animated: true },
    { id: "e1-4", source: "1", target: "4", animated: true },
    { id: "e1-5", source: "1", target: "5", animated: true },
    { id: "e1-6", source: "2", target: "6", animated: true },
    { id: "e1-7", source: "2", target: "7", animated: true },
    { id: "e1-8", source: "2", target: "8", animated: true },
    { id: "e1-9", source: "2", target: "9", animated: true },
    //
    { id: "e1-10", source: "3", target: "10", animated: true },
    { id: "e1-11", source: "3", target: "11", animated: true },
    { id: "e1-12", source: "3", target: "12", animated: true },
    { id: "e1-13", source: "3", target: "13", animated: true },
    //
    { id: "e1-14", source: "4", target: "14", animated: true },
    { id: "e1-15", source: "4", target: "15", animated: true },
    { id: "e1-16", source: "4", target: "16", animated: true },
    { id: "e1-17", source: "4", target: "17", animated: true },
    //
    { id: "e1-18", source: "5", target: "18", animated: true },
    { id: "e1-19", source: "5", target: "19", animated: true },
    { id: "e1-20", source: "5", target: "20", animated: true },
    { id: "e1-21", source: "5", target: "21", animated: true },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
    setModalOpen(true);
  };

  // Cập nhật trạng thái hoàn thành
  const handleCompletionChange = (nodeId, completed) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, completed } }
          : node
      )
    );
  };

  return (
    <div style={{ height: "100vh" }}>
      {/* <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      /> */}
      <div
      // style={{ height: "80vh", display: "flex", justifyContent: "center" }}
      >
        {/* <div
          style={{
            // flex: "0 0 30%",
            padding: "16px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Paper
            style={{
              height: "500px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "28px",
            }}
          >
            <Title order={1}>Generate roadmaps with AI</Title>
            <Text size="xl">
              Enter the position you want to achieve and the time you want to
              achieve it, let the AI generate a roadmap for you
            </Text>
            <Group mt={16}>
              <Select
                placeholder="Position Goal"
                data={["Fresher", "Junior", "Middle", "Senior", "Leader"]}
                mb={16}
                size="lg"
              />
              <NumberInput placeholder="Year" mb={16} size="lg" />
            </Group>
            <Button
              variant="filled"
              color="red"
              size="lg"
              onClick={handleGeneratorClick}
            >
              Generator
            </Button>
          </Paper>
        </div> */}

        {/* <div style={{ flex: "1", height: "100%" }}>
          {showReactFlow && (
            <ReactFlowProvider>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={handleNodeClick}
                fitView
              >
                <MiniMap />
                <Controls />
              </ReactFlow>
            </ReactFlowProvider>
          )}
        </div> */}

        <Paper mb={32} p={16}>
          <Group>
            <Text
              style={{ fontWeight: "bold", fontSize: "80px", color: "#C1351F" }}
            >
              TOP 3
            </Text>
            <Group>
              <Box mb={8}>
                <img src="/winner1.png" height={300} />
              </Box>
              <Box>
                <Box mb={16}>
                  <img src="/winner2.png" />
                </Box>
                <Box mb={16}>
                  <img src="/winner3.png" width={179} />
                </Box>
              </Box>
            </Group>
            <Box px={16} py={8} w={300} className="shadow-md">
              <Text ta="center">Tỉ lệ tham gia khóa học</Text>
              <PieChart strokeWidth={1} data={dataCharts} h={200} />
              <Grid>
                <Grid.Col span={4}>
                  <Box className="flex flex-col items-center">
                    <Badge size="sm" circle></Badge>
                    <Text>BE 40</Text>
                  </Box>
                  <Box className="flex flex-col items-center">
                    <Badge size="sm" circle color="red"></Badge>
                    <Text>FE 31</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Box className="flex flex-col items-center">
                    <Badge size="sm" circle color="orange"></Badge>
                    <Text>MO 18</Text>
                  </Box>
                  <Box className="flex flex-col items-center">
                    <Badge size="sm" circle color="yellow"></Badge>
                    <Text>QA 20</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Box className="flex flex-col items-center">
                    <Badge size="sm" circle color="orange"></Badge>
                    <Text>PMO 9</Text>
                  </Box>
                  <Box className="flex flex-col items-center">
                    <Badge size="sm" circle color="yellow"></Badge>
                    <Text>BA 2</Text>
                  </Box>
                </Grid.Col>
              </Grid>
            </Box>
            <Group gap={32} ml={32}>
              <Box>
                <Group
                  mb={16}
                  className="bg-[#796EFF] p-4 rounded-lg text-white"
                >
                  <img src="/icons/appointment.svg" height={50} />
                  <Box>
                    <Title order={2}>194 lộ trình</Title>
                    <Text size="xl">phù hợp đã được tạo</Text>
                  </Box>
                </Group>
                <Group className="bg-[#3C9C67] p-4 rounded-lg text-white">
                  <img src="/icons/book.svg" height={50} />
                  <Box>
                    <Title order={2}>100 nhân viên</Title>
                    <Text size="xl">hoàn thành chặng 1</Text>
                  </Box>
                </Group>
              </Box>
              <Box>
                <Group
                  mb={16}
                  className="bg-[#FF9500] p-4 rounded-lg text-white"
                >
                  <img src="/icons/person.svg" height={50} />
                  <Box>
                    <Title order={2}>150 nhân viên</Title>
                    <Text size="xl">đang tham gia đào tạo</Text>
                  </Box>
                </Group>
                <Group className="bg-[#970041] p-4 rounded-lg text-white">
                  <img src="/icons/fire.svg" height={50} />
                  <Box>
                    <Title order={2}>103 ngày</Title>
                    <Text size="xl">Chuỗi streak dài nhất</Text>
                  </Box>
                </Group>
              </Box>
            </Group>
          </Group>
        </Paper>

        <Paper p={32}>
          <Box>
            <Title order={1} mb={32}>
              Thông tin nhân viên
            </Title>
            <Group>
              <Grid w={"100%"}>
                <Grid.Col span={4}>
                  <Input.Wrapper label="Họ và tên">
                    <Input value="EN0300 - Đỗ Thị Nhớ" size="lg" disabled />
                  </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Input.Wrapper label="Chức vụ/ vị trí">
                    <Input value="Frontend Engineer" size="lg" disabled />
                  </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Input.Wrapper label="Trình độ">
                    <Input value="Fresher" size="lg" disabled />
                  </Input.Wrapper>
                </Grid.Col>
              </Grid>
            </Group>
          </Box>
          <Box>
            <Title order={1} my={32}>
              Lên kế hoạch học tập
            </Title>
            <Tabs defaultValue="first">
              <Tabs.List>
                <Tabs.Tab className="text-xl" value="first">
                  Bạn đã có mục tiêu rõ ràng
                </Tabs.Tab>
                <Tabs.Tab size="lg" value="second">
                  Bạn vẫn chưa có mục tiêu sắp tới
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="first" pb="xs" mt={32}>
                <Group>
                  <Grid w={"100%"}>
                    <Grid.Col span={6}>
                      <Select
                        label="Chọn mục tiêu của bạn"
                        placeholder="Trình độ muốn hướng tới"
                        data={[
                          "Junior 1",
                          "Junior 2",
                          "Junior 3",
                          "Middle 1",
                          "Middle 2",
                          "Senior 1",
                          "Senior 2",
                          "Leader",
                        ]}
                        size="lg"
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Select
                        label="Đặt thời gian hoàn thành cho mục tiêu "
                        placeholder="Pick value"
                        data={[
                          "3 tháng",
                          "6 tháng",
                          "9 tháng",
                          "1 năm",
                          "1,5 năm",
                        ]}
                        size="lg"
                      />
                    </Grid.Col>
                  </Grid>
                </Group>
                <Group justify="end" mt={32}>
                  <Button
                    variant="outline"
                    color="#C1351F"
                    loading={loading}
                    onClick={handleGeneratorClick}
                    size="lg"
                  >
                    Tạo lộ trình dành riêng cho bạn
                  </Button>
                </Group>
              </Tabs.Panel>
              <Tabs.Panel value="second" pb="xs">
                Gallery panel
              </Tabs.Panel>
            </Tabs>
          </Box>
        </Paper>
      </div>

      {showReactFlow && (
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={handleNodeClick}
            fitView
          >
            <MiniMap />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      )}

      <Chatbox />

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedNode?.data.label || "Node Details"}
        size="xl"
      >
        <div>
          <p>
            Description: This is the description for {selectedNode?.data.label}.
          </p>
          <Box mt={16}>
            <iframe
              width="100%"
              height="300"
              src={selectedNode?.data.videoUrl} // Render video URL from selected node
              title="Course Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default RoadmapGenerator;
